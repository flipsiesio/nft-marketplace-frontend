import { put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import { TronState } from 'types';
import { TronStatus } from 'appConstants';
import { getNetworkName } from 'utils';
import { logoutTronAction } from '../actions';
import { TronActionTypes } from '../actionTypes';
import { nftMarketSignOutAction } from '../../nftMarket/actions';

function* logoutTronSaga({ type }: ReturnType<typeof logoutTronAction>) {
  try {
    yield put(apiActions.request(type));
    const network = getNetworkName(window.tronWeb?.fullNode?.host);

    const payload: TronState = {
      address: '',
      name: '',
      balance: 0,
      status: window.tronWeb ? TronStatus.AVAILABLE : TronStatus.NOT_AVAILABLE,
      network,
    };

    yield put(nftMarketSignOutAction());

    yield put(apiActions.success(type, payload));
  } catch (err) {
    yield put(apiActions.error(type, err));
    toast.error(err);
  }
}

export default function* listener() {
  yield takeLatest(TronActionTypes.LOGOUT, logoutTronSaga);
}
