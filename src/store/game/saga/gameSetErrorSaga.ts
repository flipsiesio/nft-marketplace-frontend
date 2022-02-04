import { select, takeLatest, put } from 'redux-saga/effects';
import { gameSetErrorAction } from 'store/game/actions';
import apiActions from 'store/api/actions';
import { GameActionTypes } from 'store/game/actionTypes';
import { toast } from 'react-toastify';
import { tronSelector } from 'store/selectors';

function* gameSetErrorSaga({ payload }: ReturnType<typeof gameSetErrorAction>) {
  const userAddress = yield select(tronSelector.getProp('address'));
  if (userAddress === payload.userAddress) {
    let message: string = '';
    if (payload.method) {
      message = `Error on requestId: ${payload.requestId}. Method - ${payload.method}`;
      yield toast.error(message);
    } else {
      message = `Error on requestId: ${payload.requestId}`;
      yield toast.error(message);
    }
    yield put(apiActions.error(GameActionTypes.START, message));
  }
}

export default function* listener() {
  yield takeLatest(GameActionTypes.SET_ERROR, gameSetErrorSaga);
}
