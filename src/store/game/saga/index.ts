import { fork } from 'redux-saga/effects';

import gameGetMaxbetSaga from './gameGetMaxbetSaga';
import gameGetLastSaga from './gameGetLastSaga';
import gameStartSaga from './gameStartSaga';
import gameSetNewGameSaga from './gameSetNewGameSaga';
import gameGetPreviousSaga from './gameGetPreviousSaga';
import gameSetErrorSaga from './gameSetErrorSaga';
import gameClaimSaga from './gameClaimSaga';
import gameSetClaimSaga from './gameSetClaimSaga';

export default function* gameSaga() {
  yield fork(gameGetMaxbetSaga);
  yield fork(gameGetLastSaga);
  yield fork(gameStartSaga);
  yield fork(gameSetNewGameSaga);
  yield fork(gameGetPreviousSaga);
  yield fork(gameSetErrorSaga);
  yield fork(gameClaimSaga);
  yield fork(gameSetClaimSaga);
}
