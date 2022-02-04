import { put, select, takeEvery } from 'redux-saga/effects';
import { gameSetClaimAction } from 'store/game/actions';
import { toast } from 'react-toastify';
import { GameActionTypes } from 'store/game/actionTypes';
import { tronSelector } from 'store/selectors';
import apiActions from 'store/api/actions';
import { removeRequestIdFromClaimLoading } from './gameClaimSaga';

function* gameSetClaimSaga({ payload }: ReturnType<typeof gameSetClaimAction>) {
  try {
    const address: string = yield select(tronSelector.getProp('address'));
    const addressToHex = window.tronWeb.address.toHex(address);
    const { userAddress, requestId } = payload;

    if (addressToHex === userAddress) {
      yield removeRequestIdFromClaimLoading(requestId);
      toast.success('Claim was successful!');
      yield put(apiActions.success(GameActionTypes.CLAIM));
    }
  } catch (err) {
    toast.error(err);
  }
}

export default function* listener() {
  yield takeEvery(GameActionTypes.SET_CLAIM, gameSetClaimSaga);
}
