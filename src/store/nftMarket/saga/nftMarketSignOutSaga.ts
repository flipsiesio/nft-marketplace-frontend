import {
  put, takeLatest,
} from 'redux-saga/effects';
import { nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { history } from '../../../utils';
import { routes } from '../../../appConstants';

function* nftMarketSignOutSaga() {
  yield put(nftMarketSetStateAction({
    isAuth: false,
    refreshToken: undefined,
    accessToken: undefined,
    signedMsg: undefined,
  }));

  history.push(routes.main.root);
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.SIGN_OUT, nftMarketSignOutSaga);
}
