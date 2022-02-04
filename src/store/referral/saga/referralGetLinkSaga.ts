import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import api from 'store/api';
import { URL, QUERY_REFERRAL_CODE } from 'appConstants';
import { tronSelector } from 'store/selectors';
import type { ApiResponse, GetReferralLinkRes } from 'types';
import { meSetStateAction } from 'store/me/actions';
import { ReferralActionTypes } from '../actionTypes';
import { referralGetLinkAction } from '../actions';

function* referralGetLinkSaga({ type }: ReturnType<typeof referralGetLinkAction>) {
  try {
    yield put(apiActions.request(type));
    const address = yield select(tronSelector.getProp('address'));
    const addressToHex = window.tronWeb.address.toHex(address);
    const res: ApiResponse<GetReferralLinkRes> = yield call(api, {
      method: 'get',
      url: URL.USER.REFERRAL_CODE(addressToHex),
    });

    const result = `${process.env.REACT_APP_URL}?${QUERY_REFERRAL_CODE}=${res.data.refCode}&address=${addressToHex}`;
    yield put(apiActions.success<string, string>(type, result));
    yield put(meSetStateAction({
      key: 'isEmailConfirm',
      value: true,
    }));
  } catch (err) {
    yield put(apiActions.error(type, err));
    yield put(meSetStateAction({
      key: 'isEmailConfirm',
      value: false,
    }));
  }
}

export default function* listener() {
  yield takeLatest(ReferralActionTypes.GET_LINK, referralGetLinkSaga);
}
