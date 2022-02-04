import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import api from 'store/api';
import { URL } from 'appConstants';
import type {
  ApiResponse,
  GameHistoryRes,
  GameHistoryReq,
  Game,
} from 'types';
import { JackpotActionTypes } from 'store/jackpot/actionTypes';
import { jackpotGetDataAction } from 'store/jackpot/actions';
import { getAmountSum } from 'utils';

function* jackpotGetDataSaga({ type }: ReturnType<typeof jackpotGetDataAction>) {
  try {
    yield put(apiActions.request(type));

    const params: GameHistoryReq = {
      limit: 10,
      offset: 0,
      type: 3, // See GAME_TYPE constant
    };

    const res: ApiResponse<GameHistoryRes> = yield call(api, {
      method: 'get',
      url: `${URL.USER.POKER_BETS_HISTORY}`,
      params,
    });

    const sortedDataByAmount: Game[] = res.data.games.sort((a, b) => {
      const bAmount = getAmountSum(b.winColorAmount, b.winPokerAmount);
      const aAmount = getAmountSum(a.winColorAmount, a.winPokerAmount);
      return bAmount - aAmount;
    });
    yield put(apiActions.success(type, sortedDataByAmount));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(JackpotActionTypes.GET_DATA, jackpotGetDataSaga);
}
