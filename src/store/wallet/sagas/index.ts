import { fork } from 'redux-saga/effects';
import { metamaskSagas } from './metamaskSagas';

export const walletEffects = [
  fork(metamaskSagas),
];

export default function* nftMarketSaga() {
  yield fork(metamaskSagas);
}
