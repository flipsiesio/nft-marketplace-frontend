import { fork } from 'redux-saga/effects';
import referralCreateLinkSaga from './referralCreateLinkSaga';
import referralGetLinkSaga from './referralGetLinkSaga';
import referralGetStatsSaga from './referralGetStatsSaga';
import referralJoinBySaga from './referralJoinBySaga';
import referralWithdrawSaga from './referralWithdrawSaga';

export default function* referralSaga() {
  yield fork(referralCreateLinkSaga);
  yield fork(referralGetLinkSaga);
  yield fork(referralGetStatsSaga);
  yield fork(referralJoinBySaga);
  yield fork(referralWithdrawSaga);
}
