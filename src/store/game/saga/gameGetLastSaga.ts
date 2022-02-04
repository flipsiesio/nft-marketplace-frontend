import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import api from 'store/api';
import { URL } from 'appConstants';
import type {
  ApiResponse,
  GameHistoryRes,
  GameHistoryReq,
} from 'types';
import { GameActionTypes } from 'store/game/actionTypes';
import { gameGetLastAction } from 'store/game/actions';

function* gameGetLastSaga({ type }: ReturnType<typeof gameGetLastAction>) {
  try {
    yield put(apiActions.request(type));

    const address = yield select(tronSelector.getProp('address'));
    const params: GameHistoryReq = {
      limit: 1,
      offset: 0,
      address: window.tronWeb.address.toHex(address),
    };

    const res: ApiResponse<GameHistoryRes> = yield call(api, {
      method: 'get',
      url: `${URL.USER.POKER_BETS_HISTORY}`,
      params,
    });

    if (res.data.games.length) {
      yield put(apiActions.success(type, res.data.games[0]));
    } else {
      yield put(apiActions.error(type, []));
    }
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(GameActionTypes.GET_LAST_GAME, gameGetLastSaga);
}
