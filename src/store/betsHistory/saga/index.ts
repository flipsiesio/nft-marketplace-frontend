import { fork } from 'redux-saga/effects';

import betsHistoryGetDataSaga from './betsHistoryGetDataSaga';

export default function* pokerSaga() {
  yield fork(betsHistoryGetDataSaga);
}
