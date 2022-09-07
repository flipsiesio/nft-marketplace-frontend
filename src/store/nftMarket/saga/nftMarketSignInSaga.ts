import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { authApiSaga } from 'store/api';
import { ApiResponse, NftMarketCheckSignRes } from 'types';
import { ERRORS, marketURL, routes } from 'appConstants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { getProvider } from 'utils/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { nftMarketSetStateAction, nftMarketSignInAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { nftMarketSelector, walletSelectors } from '../../selectors';
import { history } from '../../../utils';
import { WalletStatus } from '../../wallet/types';

function* checkSign(msg: string, address: string) {
  const res: ApiResponse<NftMarketCheckSignRes> = yield call(authApiSaga, {
    method: 'post',
    url: marketURL.AUTH.CHECK_SIGN,
    data: {
      walletAddress: address,
      signature: msg,
    },
  });

  return res;
}

function* nftMarketSignInSaga({ type, callback }: ReturnType<typeof nftMarketSignInAction>) {
  try {
    yield put(apiActions.request(type));
    const status: WalletStatus = yield select(walletSelectors.getProp('status'));
    const address: string = yield select(walletSelectors.getProp('address'));
    const signedMsg: string = yield select(nftMarketSelector.getProp('signedMsg'));
    const provider: Web3Provider = yield getProvider();

    if (status !== WalletStatus.CONNECTED) {
      toast.error(ERRORS.signInToTroLink);
      return;
    }

    if (signedMsg) {
      const checkRes: ApiResponse<NftMarketCheckSignRes> = yield checkSign(signedMsg, address);

      if (checkRes) {
        if (callback) callback();
        yield put(apiActions.success(type, checkRes.data));
        return;
      }
    }

    const res: ApiResponse<string> = yield call(authApiSaga, {
      method: 'post',
      url: marketURL.AUTH.SIGN_IN,
      data: {
        tronWalletAddress: address,
      },
    });

    const msg: string = yield provider.getSigner().signMessage(`${res.data}`);

    const checkRes: ApiResponse<NftMarketCheckSignRes> = yield checkSign(msg, address);
    yield put(nftMarketSetStateAction({
      isAuth: true,
      refreshToken: checkRes.data.refreshToken,
      accessToken: checkRes.data.accessToken,
      signedMsg: msg,
    }));
    if (callback) callback();
    yield put(apiActions.success(type, checkRes.data));
  } catch (err) {
    if ((err as AxiosError).response?.data.message) {
      toast.error((err as AxiosError).response?.data.message);
      history.push(routes.explore.root);
    }
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.SIGN_IN, nftMarketSignInSaga);
}
