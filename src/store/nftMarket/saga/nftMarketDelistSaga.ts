import { toast } from 'react-toastify';
import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { nftMarketDelistAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketDelistSaga(
  { type, payload, callback }: ReturnType<typeof nftMarketDelistAction>,
) {
  try {
    yield put(apiActions.request(type));
    // TODO: need an NFT address here
    const from: string = yield select(tronSelector.getProp('address'));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    yield contract.getBackFromSale(payload).send({
      from,
    });
    yield put(apiActions.success(type));
    callback();
    yield toast.success('Cancel the sale successful!');
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.DELIST, nftMarketDelistSaga);
}
