import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { authApiSaga } from 'store/api';
import { ApiResponse, NftMarketCheckSignRes } from 'types';
import {
  marketURL, routes, TronStatus, ERRORS,
} from 'appConstants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { nftMarketSetStateAction, nftMarketSignInAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { nftMarketSelector, tronSelector } from '../../selectors';
import { history } from '../../../utils';

function* checkSign(msg: string, address: string) {
  const res: ApiResponse<NftMarketCheckSignRes> = yield call(authApiSaga, {
    method: 'post',
    url: marketURL.AUTH.CHECK_SIGN,
    data: {
      tronWalletAddress: address,
      signedMsg: msg,
    },
  });

  return res;
}

function hashMessage(str: string) {
  // convert to hex format and remove the beginning "0x"
  const hexStrWithout0x = window.tronWeb.toHex(str).replace(/^0x/, '');
  // conert hex string to byte array
  const byteArray = window.tronWeb.utils.code.hexStr2byteArray(hexStrWithout0x);
  // keccak256 computing, then remove "0x"
  return window.tronWeb.sha3(byteArray).replace(/^0x/, '');
}

const signMessage = async (str: string) => {
  const strHash = hashMessage(str);
  let signedStr = await window.tronWeb.trx.sign(strHash);
  const tail = signedStr.substring(128, 130);
  if (tail === '01') {
    signedStr = `${signedStr.substring(0, 128)}1c`;
  } else if (tail === '00') {
    signedStr = `${signedStr.substring(0, 128)}1b`;
  }
  return signedStr;
};

function* nftMarketSignInSaga({ type, callback }: ReturnType<typeof nftMarketSignInAction>) {
  try {
    yield put(apiActions.request(type));
    const tronStatus: TronStatus = yield select(tronSelector.getProp('status'));
    const address: string = yield select(tronSelector.getProp('address'));
    const signedMsg: string = yield select(nftMarketSelector.getProp('signedMsg'));

    if (tronStatus !== TronStatus.ADDRESS_SELECTED) {
      toast.error(ERRORS.signInToTroLink);
      return;
    }

    if (signedMsg) {
      const checkRes = yield checkSign(signedMsg, address);

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

    // const hex = window.tronWeb.toHex(res.data);
    const msg = yield call(signMessage, res.data);

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
