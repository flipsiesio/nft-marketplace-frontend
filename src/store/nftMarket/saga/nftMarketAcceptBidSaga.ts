import {
  put, takeLatest, select,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { nftMarketAcceptBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketAcceptBidSaga(
  { type, payload: { payerAddress, nftId } }: ReturnType<typeof nftMarketAcceptBidAction>,
) {
  try {
    yield put(apiActions.request(type));
    const from: string = yield select(tronSelector.getProp('address'));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    yield contract.performBuyOperation(payerAddress, nftId).send({
      from,
    });
    yield put(apiActions.success(type));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.ACCEPT_BID, nftMarketAcceptBidSaga);
}
