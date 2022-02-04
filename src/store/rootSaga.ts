import { fork } from 'redux-saga/effects';

import meSaga from './me/saga';
import pokerBetsHistory from './betsHistory/saga';
import jackpot from './jackpot/saga';
import tron from './tron/saga';
import referral from './referral/saga';
import game from './game/saga';
import nftMarket from './nftMarket/saga';

export default function* rootSaga() {
  yield fork(meSaga);
  yield fork(pokerBetsHistory);
  yield fork(jackpot);
  yield fork(tron);
  yield fork(referral);
  yield fork(game);
  yield fork(nftMarket);
}
