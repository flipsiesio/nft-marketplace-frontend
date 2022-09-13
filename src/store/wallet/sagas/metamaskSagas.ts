import { EventChannel, eventChannel } from 'redux-saga';
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  Network, NotificationName, routes, showNotificationMessage,
} from 'appConstants';
import {
  getMetamaskChainId, getNetworkName, history, simpleErrorHandler,
} from 'utils';
import {
  MetamaskProvider, MetamaskRequestMethod, WalletStatus, Web3Event,
} from '../types';
import { walletConnect, walletDisconnect, walletSetState } from '../actionCreators';
import { walletSelectors } from '../../selectors/wallet';
import { WalletActionType } from '../actionTypes';
import { nftMarketSignInAction, nftMarketSignOutAction } from '../../nftMarket/actions';

let metamaskProvider: MetamaskProvider;

function createEthereumProviderChannel() {
  return eventChannel((emit) => {
    const accountChangeHandler = (addressesOtherAccount: string[]) => {
      emit({
        event: Web3Event.accountsChanged,
        addressesOtherAccount,
      });
    };

    const disconnectHandler = () => {
      emit({
        event: Web3Event.disconnect,
      });
    };

    const changeNetwork = (id?: string) => {
      emit({
        event: Web3Event.chainChanged,
        id,
      });
    };

    metamaskProvider.on(Web3Event.accountsChanged, accountChangeHandler);
    metamaskProvider.on(Web3Event.disconnect, disconnectHandler);
    metamaskProvider.on(Web3Event.chainChanged, changeNetwork);

    return () => {};
  });
}

function* handlePayload({
  event,
  id,
  addressesOtherAccount,
}: { event: Web3Event, addressesOtherAccount: string[], id?: string }) {
  try {
    if (event === Web3Event.chainChanged) {
      yield put(walletSetState({
        status: WalletStatus.LOADING,
      }));

      const network = getNetworkName(id);
      if (network) {
        yield put(walletSetState({
          status: WalletStatus.CONNECTED,
          network,
        }));
      } else {
        yield put(walletSetState({ status: WalletStatus.NOT_SUPPORT }));
        showNotificationMessage(NotificationName.NotSupportNetwork);
      }
    }

    if (event === Web3Event.accountsChanged) {
      if (addressesOtherAccount && addressesOtherAccount.length !== 0) {
        const address = addressesOtherAccount[0];

        yield put(walletSetState({
          status: WalletStatus.CONNECTED,
          address,
        }));
        showNotificationMessage(NotificationName.AccountChanged);
      } else {
        yield put(walletDisconnect({
          status: WalletStatus.LOST,
        }));

        history.push(routes.main.root);
      }
    }
  } catch (err) {
    simpleErrorHandler(err);
  }
}

export function* connectMetamaskSaga({ appStartWalletConnect }: ReturnType<typeof walletConnect>) {
  try {
    yield put(walletSetState({
      status: WalletStatus.LOADING,
    }));
    metamaskProvider = yield detectEthereumProvider();
    if (!metamaskProvider || !metamaskProvider.isMetaMask) {
      yield put(walletDisconnect({ status: WalletStatus.LOST }));
      showNotificationMessage(NotificationName.InstallMetamask);
      history.push(routes.main.root);
    }
    if (metamaskProvider) {
      const addresses: string[] = yield metamaskProvider.request({
        method: MetamaskRequestMethod.eth_requestAccounts,
      });

      const metamaskProviderChannel: EventChannel<unknown> =
        yield call(createEthereumProviderChannel);
      yield takeLatest(metamaskProviderChannel, handlePayload);

      if (!addresses.length) {
        yield put(walletDisconnect({
          status: WalletStatus.NOT_AVAILABLE,
        }));
        return;
      }
      const networkId: string = yield call(getMetamaskChainId);
      const network: Network | null = getNetworkName(networkId);

      if (network) {
        const status: WalletStatus = yield select(walletSelectors.getProp('status'));
        if (status === WalletStatus.LOST) {
          return;
        }
        yield put(walletSetState({
          status: WalletStatus.CONNECTED,
          address: addresses[0],
        }));

        if (!appStartWalletConnect) {
          yield put(nftMarketSignInAction());
        }
      } else {
        yield put(walletDisconnect({
          status: WalletStatus.NOT_SUPPORT,
        }));
        showNotificationMessage(NotificationName.NotSupportNetwork);
      }
    }
  } catch (err) {
    yield put(walletSetState({
      status: WalletStatus.NOT_AVAILABLE,
    }));
    simpleErrorHandler(err);
  }
}

export function* disconnectMetamaskSaga({ payload }: ReturnType<typeof walletDisconnect>) {
  try {
    const status = payload?.status;

    const provider: MetamaskProvider = yield call(detectEthereumProvider);
    let updatedStatus;

    if (!status) {
      if (
        !provider ||
        !provider.isMetaMask
      ) updatedStatus = WalletStatus.NOT_AVAILABLE;
    }
    yield put(walletSetState({
      status: status || updatedStatus,
      isLostWallet: status === WalletStatus.LOST,
    }));

    yield put(nftMarketSignOutAction());
  } catch (err) {
    simpleErrorHandler(err);
  }
}

export function* metamaskSagas() {
  yield takeLatest(WalletActionType.CONNECT, connectMetamaskSaga);
  yield takeLatest(WalletActionType.DISCONNECT, disconnectMetamaskSaga);
}
