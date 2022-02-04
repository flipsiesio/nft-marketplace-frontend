import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import type { ReferralStateStats } from 'types';
import { getTronContract, getRankInfo } from 'utils';
import { tronSelector } from 'store/selectors';
import { ReferralActionTypes } from '../actionTypes';
import { referralGetStatsAction } from '../actions';

const RES_INDEXES = {
  invitedPlayers: 4,
  totalEarnings: 3,
  rank: 2,
  bonus: 1,
};

function* referralGetStatsSaga({ type }: ReturnType<typeof referralGetStatsAction>) {
  try {
    yield put(apiActions.request(type));
    const address = yield select(tronSelector.getProp('address'));
    const contract = yield call(getTronContract, process.env.REACT_APP_CONTRACT_CONTROLLER_ADDRESS || '');
    const res = yield contract.getReferralStats(address).call();

    const rank = yield window.tronWeb
      .toBigNumber(res[RES_INDEXES.rank]._hex || 0)
      .toString(10);

    const {
      name: rankName,
      maxValue: rankMaxValue,
      bonus,
    } = yield getRankInfo(rank);

    const payload: ReferralStateStats = {
      totalEarnings: yield window.tronWeb
        .toBigNumber(res[RES_INDEXES.totalEarnings]._hex || 0)
        .toString(10),
      rank,
      invitedPlayers: yield window.tronWeb.toDecimal(res[RES_INDEXES.invitedPlayers]._hex || 0),
      rankName,
      rankMaxValue,
      bonus,
    };

    yield put(apiActions.success(type, payload));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(ReferralActionTypes.GET_STATS, referralGetStatsSaga);
}
