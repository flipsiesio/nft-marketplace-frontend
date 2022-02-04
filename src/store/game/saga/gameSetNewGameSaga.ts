import {
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { GameActionTypes } from 'store/game/actionTypes';
import { gameSetNewGameAction, gameSetResultAction } from 'store/game/actions';
import { tronSelector } from 'store/selectors';
import { toast } from 'react-toastify';

function* gameSetNewGameSaga({ payload }: ReturnType<typeof gameSetNewGameAction>) {
  try {
    const address = yield select(tronSelector.getProp('address'));
    const { userAddress } = payload;

    if (window.tronWeb.address.toHex(address) === userAddress) {
      yield put(gameSetResultAction(payload));
      yield put(apiActions.success(GameActionTypes.GET_LAST_GAME, payload));
    }
  } catch (err) {
    toast.error(err);
  }
}

export default function* listener() {
  yield takeLatest(GameActionTypes.SET_NEW_GAME, gameSetNewGameSaga);
}
