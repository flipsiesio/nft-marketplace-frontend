import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract, fromSunToNumber, roundUpNumber } from 'utils';
import { JackpotActionTypes } from 'store/jackpot/actionTypes';
import { jackpotGetValueAction } from 'store/jackpot/actions';

function* jackpotGetValueSaga({ type }: ReturnType<typeof jackpotGetValueAction>) {
  try {
    yield put(apiActions.request(type));
    const contract = yield getTronContract(process.env.REACT_APP_CONTRACT_CONTROLLER_ADDRESS || '');

    const result = yield contract.jackpot().call();
    const jackpotTrx = fromSunToNumber(result._hex);
    const jackpot = yield Number(roundUpNumber(jackpotTrx));

    yield put(apiActions.success<string, number>(
      type,
      jackpot,
    ));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(JackpotActionTypes.GET_VALUE, jackpotGetValueSaga);
}
