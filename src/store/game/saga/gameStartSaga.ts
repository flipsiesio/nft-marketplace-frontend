/**
 * Game initialization
 * Calling the "play" method on poker smart-contract that requires the following parameters:
 * @param colorToSun - color bet in sun
 * @param chooseColor - chosenColor where 1 - black, 0 -red;
 * In body send method:
 * @param from - address of user
 * @param callValue - the amount of the bet on color and poker
 */

import {
  put,
  call,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract } from 'utils';
import { GameSelectedColor } from 'appConstants';
import { GameActionTypes } from 'store/game/actionTypes';
import { gameStartAction } from 'store/game/actions';
import { tronSelector } from 'store/selectors';
import { toast } from 'react-toastify';

function* gameStartSaga({ type, payload }: ReturnType<typeof gameStartAction>) {
  try {
    yield put(apiActions.request(type));

    const contract = yield call(getTronContract, process.env.REACT_APP_CONTRACT_POKER_ADDRESS || '');
    const chooseColor = payload.selectedColor === GameSelectedColor.BLACK ? 1 : 0;
    const colorToSun: string = yield window.tronWeb.toSun(payload.color);
    const callValue: string = yield window.tronWeb.toSun(payload.flip + payload.color);
    const from: string = yield select(tronSelector.getProp('address'));

    yield contract.play(colorToSun, chooseColor).send({
      from,
      callValue,
      feeLimit: 1_000_000_000,
    });

    yield take(GameActionTypes.SET_RESULT);
    yield put(apiActions.success(type, payload));
  } catch(err) {
    toast.error(err.message || err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(GameActionTypes.START, gameStartSaga);
}
