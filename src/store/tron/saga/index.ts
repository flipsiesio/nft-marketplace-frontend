import { fork } from 'redux-saga/effects';
import connectTronSaga from './connectTronSaga';
import logoutTronSaga from './logoutTronSaga';

export default function* tronSaga() {
  yield fork(connectTronSaga);
  yield fork(logoutTronSaga);
}
