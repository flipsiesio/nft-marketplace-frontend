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
  BetsHistoryState,
} from 'types';
import { BetsHistoryActionTypes } from 'store/betsHistory/actionTypes';
import { betsHistoryGetDataAction } from 'store/betsHistory/actions';

function* betsHistoryGetDataSaga({ type, payload }: ReturnType<typeof betsHistoryGetDataAction>) {
  try {
    const address = yield select(tronSelector.getProp('address'));
    yield put(apiActions.request(type));

    const res: ApiResponse<GameHistoryRes> = yield call(api, {
      method: 'get',
      url: `${URL.USER.POKER_BETS_HISTORY}`,
      params: {
        address: window.tronWeb.address.toHex(address),
        ...payload,
      },
    });
    const result: BetsHistoryState = {
      bets: res.data.games,
      count: res.data.gamesCount,
    };
    yield put(apiActions.success(type, result));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(BetsHistoryActionTypes.GET_DATA, betsHistoryGetDataSaga);
}
