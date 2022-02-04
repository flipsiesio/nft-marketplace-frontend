/* eslint-disable no-console */
import { eventChannel } from 'redux-saga';
import {
  call,
  put,
  take,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { TronState } from 'types';
import { TronStatus, ERRORS } from 'appConstants';
import { createUser, history, getNetworkName } from 'utils';
import { toast } from 'react-toastify';
import { connectTronAction, logoutTronAction, tronSetStateAction } from '../actions';
import { TronActionTypes } from '../actionTypes';

const MS_RETRY_TRON = 2000;
const MAX_ATTEMPT_GET_BALANCE = 5;
const MS_RETRY_GET_BALANCE = 1500;

function createWindowMessageChannel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribe = (emitter: any) => {
    window.addEventListener('message', emitter);
    return () => window.removeEventListener('message', emitter);
  };
  return eventChannel(subscribe);
}

function* getBalance(address: string) {
  for (let i = 0; i < MAX_ATTEMPT_GET_BALANCE; i++) {
    try {
      if (address) {
        const balance = yield window.tronWeb.trx.getBalance(address);
        return Number(yield window.tronWeb.fromSun(balance));
      }

      return 0;
    } catch (err) {
      if (i < MAX_ATTEMPT_GET_BALANCE - 1) {
        if (err.message === 'Network Error') {
          yield delay(MS_RETRY_GET_BALANCE);
        } else {
          throw new Error(ERRORS.getBalanceFailed);
        }
      }
    }
  }

  throw new Error(ERRORS.getBalanceFailed);
}

function getPlayerName(address: string) {
  if (address) {
    return window.tronWeb.defaultAddress?.name || 'Player';
  }

  return '';
}

function* setConnect() {
  if (window.tronWeb) {
    const address = window.tronWeb.defaultAddress?.base58 || '';
    const networkUrl = window.tronWeb.fullNode.host;
    const network = getNetworkName(networkUrl);

    /**
     * Check that for user is on the correct network
     */
    if (networkUrl !== process.env.REACT_APP_FULL_NODE_URL && address) {
      const needNetworkName = getNetworkName(process.env.REACT_APP_FULL_NODE_URL as string);
      if (!needNetworkName) {
        throw new Error(ERRORS.notSupportNetwork);
      }
      throw new Error(ERRORS.wrongNetwork(needNetworkName));
    }

    const payload: TronState = {
      address,
      name: yield getPlayerName(address),
      status: address ? TronStatus.ADDRESS_SELECTED : TronStatus.AVAILABLE,
      balance: yield getBalance(address),
      network,
    };

    yield put({
      type: TronActionTypes.CONNECT_SUCCESS,
      payload,
    });

    if (address) {
      yield createUser({ address: window.tronWeb.address.toHex(address) });
    } else {
      throw new Error(ERRORS.signInToTroLink);
    }
  } else {
    yield put({
      type: TronActionTypes.CONNECT_SUCCESS,
    });
  }
}

function* handleTronListener() {
  const tronChannel = yield call(createWindowMessageChannel);
  while (true) {
    const e = yield take(tronChannel);
    if (['setAccount', 'setNode'].includes(e.data.message?.action)) {
      if (!e.data.message.data.address) {
        yield put(logoutTronAction());
      } else {
        yield setConnect();
      }
    }
  }
}

function* connectTronSaga({ type, meta }: ReturnType<typeof connectTronAction>) {
  try {
    yield put(apiActions.request(type));

    if (!window.tronWeb?.defaultAddress?.base58) yield delay(MS_RETRY_TRON);
    yield setConnect();

    yield handleTronListener();

    if (meta) history.push(meta);
  } catch (err) {
    yield put(apiActions.error(type, err.message));
    yield put(tronSetStateAction({
      status: window.tronWeb ? TronStatus.AVAILABLE : TronStatus.NOT_AVAILABLE,
    }));
    toast.warn(err.message);
  }
}

export default function* listener() {
  yield takeLatest(TronActionTypes.CONNECT, connectTronSaga);
}
