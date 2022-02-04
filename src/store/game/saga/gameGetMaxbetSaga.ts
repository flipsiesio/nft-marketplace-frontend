import {
  put,
  call,
  takeLatest,
  select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { GameActionTypes } from 'store/game/actionTypes';
import { gameGetMaxbetAction } from 'store/game/actions';

function* getContractMaxbet() {
  const contract = yield call(getTronContract, process.env.REACT_APP_CONTRACT_POKER_ADDRESS || '');
  const maxBet = yield contract._maxBet().call();
  const maxBetToDecimal = yield window.tronWeb.toDecimal(maxBet._hex);
  const maxBetToTrx = yield window.tronWeb.fromSun(maxBetToDecimal);
  return Number(maxBetToTrx);
}

function* gameGetMaxbetSaga({ type }: ReturnType<typeof gameGetMaxbetAction>) {
  try {
    yield put(apiActions.request(type));
    const contractMaxbet = yield getContractMaxbet();
    const userMaxbet = yield select(tronSelector.getProp('balance'));

    const maxbet: number = Math.floor(userMaxbet > contractMaxbet ? contractMaxbet : userMaxbet);

    yield put(apiActions.success(type, maxbet));
  } catch(err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(GameActionTypes.GET_MAXBET, gameGetMaxbetSaga);
}
