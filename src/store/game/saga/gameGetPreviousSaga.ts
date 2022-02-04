import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import api from 'store/api';
import { URL } from 'appConstants';
import { GameActionTypes } from 'store/game/actionTypes';
import { gameGetPreviousAction } from 'store/game/actions';
import type {
  ApiResponse,
  GameHistoryRes,
  GameHistoryReq,
  Game,
} from 'types';

function* gameGetPreviousSaga({ type }: ReturnType<typeof gameGetPreviousAction>) {
  try {
    yield put(apiActions.request(type));
    const params: GameHistoryReq = {
      limit: 10,
      offset: 0,
    };

    const res: ApiResponse<GameHistoryRes> = yield call(api, {
      method: 'get',
      url: `${URL.USER.POKER_BETS_HISTORY}`,
      params,
    });

    const data: Game[] = res.data.games;

    yield put(apiActions.success(type, data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(GameActionTypes.GET_PREVIOUS, gameGetPreviousSaga);
}
