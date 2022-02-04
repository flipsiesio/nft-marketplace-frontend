import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { authSaga } from 'store/api';
import { ApiResponse, NftMarketCheckSignRes } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketSetStateAction, nftMarketSignInAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { nftMarketSelector, tronSelector } from '../../selectors';

function* checkSign(msg: string, address: string) {
  const res: ApiResponse<NftMarketCheckSignRes> = yield call(authSaga, {
    method: 'post',
    url: marketURL.AUTH.CHECK_SIGN,
    data: {
      tronWalletAddress: address,
      signedMsg: msg,
    },
  });

  return res;
}

function* nftMarketSighInSaga({ type, callback }: ReturnType<typeof nftMarketSignInAction>) {
  try {
    yield put(apiActions.request(type));
    const address: string = yield select(tronSelector.getProp('address'));
    const signedMsg: string = yield select(nftMarketSelector.getProp('signedMsg'));

    if (signedMsg) {
      const checkRes = yield checkSign(signedMsg, address);

      if (checkRes) {
        if (callback) callback();
        return;
      }
    }

    const res: ApiResponse<string> = yield call(authSaga, {
      method: 'post',
      url: marketURL.AUTH.SIGN_IN,
      data: {
        tronWalletAddress: address,
      },
    });

    const hex = window.tronWeb.toHex(res.data);
    const msg = yield call(window.tronWeb.trx.sign, hex);

    const checkRes = yield checkSign(msg, address);
    yield put(nftMarketSetStateAction({
      isAuth: true,
      refreshToken: checkRes.data.refreshToken,
      accessToken: checkRes.data.accessToken,
      signedMsg: msg,
    }));
    if (callback) callback();
    yield put(apiActions.success(type, checkRes.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.SIGN_IN, nftMarketSighInSaga);
}
