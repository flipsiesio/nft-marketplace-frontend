import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { AxiosError } from 'axios';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import api from 'store/api';
import { URL } from 'appConstants';
import { tronSelector } from 'store/selectors';
import { ReferralActionTypes } from '../actionTypes';
import { referralCreateLinkAction } from '../actions';

function* referralCreateLinkSaga({ type, payload }: ReturnType<typeof referralCreateLinkAction>) {
  try {
    yield put(apiActions.request(type));
    const address = yield select(tronSelector.getProp('address'));

    yield call(api, {
      method: 'post',
      url: URL.USER.CREATE_LINK(window.tronWeb.address.toHex(address)),
      data: {
        email: payload,
      },
    });

    yield put(apiActions.success(type));
    yield toast.success('Email was sent!');
  } catch (err) {
    let errorMessage: string = '';

    if ((err as AxiosError).isAxiosError) {
      errorMessage = (err as AxiosError)?.response?.data.message;
    }

    yield put(apiActions.error(type, errorMessage));
    yield toast.error(errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(ReferralActionTypes.CREATE_LINK, referralCreateLinkSaga);
}
