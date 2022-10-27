import { fork } from 'redux-saga/effects';

import meSaga from './me/saga';
import nftMarket from './nftMarket/saga';
import walletSaga from './wallet/sagas';
import adminSaga from './admin/sagas';

export default function* rootSaga() {
  yield fork(adminSaga);
  yield fork(meSaga);
  yield fork(nftMarket);
  yield fork(walletSaga);
}
