import { fork } from 'redux-saga/effects';

import jackpotGetDataSaga from './jackpotGetDataSaga';
import jackpotGetValueSaga from './jackpotGetValueSaga';

export default function* pokerSaga() {
  yield fork(jackpotGetDataSaga);
  yield fork(jackpotGetValueSaga);
}
