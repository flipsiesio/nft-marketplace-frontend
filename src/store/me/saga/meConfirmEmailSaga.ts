import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import api from 'store/api';
import { URL, routes } from 'appConstants';
import { history } from 'utils';
import type {
  ApiResponse,
} from 'types';
import { toast } from 'react-toastify';
import { MeActionTypes } from 'store/me/actionTypes';
import { meConfirmEmailAction } from 'store/me/actions';

function* meConfirmEmailSaga({ type, payload }: ReturnType<typeof meConfirmEmailAction>) {
  try {
    if (payload) {
      yield put(apiActions.request(type));
      const res: ApiResponse<boolean> = yield call(api, {
        method: 'get',
        url: `${URL.USER.CONFIRM_EMAIL(payload)}`,
      });
      if (res.data) {
        yield call(toast.success, 'Email was confirmed');
        yield put(apiActions.success<string, boolean>(type, res.data));
        history.push(routes.main.root);
      } else {
        const error = 'Email is already confirmed';
        yield call(toast.warning, error);
        yield put(apiActions.error(type, error));
      }
    }
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(MeActionTypes.CONFIRM_EMAIL, meConfirmEmailSaga);
}
