import { fork } from 'redux-saga/effects';

import meSaga from './me/saga';
import tron from './tron/saga';
import nftMarket from './nftMarket/saga';

export default function* rootSaga() {
  yield fork(meSaga);
  yield fork(tron);
  yield fork(nftMarket);
}
