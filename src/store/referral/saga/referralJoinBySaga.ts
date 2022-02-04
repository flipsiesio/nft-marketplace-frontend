import {
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import { toast } from 'react-toastify';
import { createUser, getTronContract } from 'utils';
import { ReferralActionTypes } from 'store/referral/actionTypes';
import { referralJoinByAction } from 'store/referral/actions';

function* joinByReferral({ type, payload }: ReturnType<typeof referralJoinByAction>) {
  try {
    yield put(apiActions.request(type));
    const { parentAddress, code } = payload;
    const address = yield select(tronSelector.getProp('address'));
    const poolControllerContract = yield call(getTronContract, process.env.REACT_APP_CONTRACT_CONTROLLER_ADDRESS || '');
    yield poolControllerContract.addRef(parentAddress, address).send();
    yield call(createUser, {
      referralCode: code,
      address: window.tronWeb.address.toHex(address),
    });
    yield put(apiActions.success(type));
  } catch (err) {
    toast.error(err.response.data.response.error || err.message);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(ReferralActionTypes.JOIN_BY, joinByReferral);
}
