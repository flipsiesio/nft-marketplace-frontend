import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import { tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { referralWithdrawAction, referralGetStatsAction } from '../actions';
import { ReferralActionTypes } from '../actionTypes';

function* referralWithdrawSaga({ type }: ReturnType<typeof referralWithdrawAction>) {
  try {
    yield put(apiActions.request(type));
    const address = yield select(tronSelector.getProp('address'));
    const poolControllerContract = yield call(getTronContract, process.env.REACT_APP_CONTRACT_CONTROLLER_ADDRESS || '');

    yield poolControllerContract.withdrawReferralEarnings(address).send();
    yield put(apiActions.success(type));
    yield toast.success('Withdraw successful!');

    yield put(referralGetStatsAction());
  } catch (err) {
    toast.error(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(ReferralActionTypes.WITHDRAW, referralWithdrawSaga);
}
