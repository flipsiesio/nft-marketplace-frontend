import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract, simpleErrorHandler } from 'utils';
import { toast } from 'react-toastify';
import { nftMarketCancelBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketCancelBidSaga(
  { type, payload: { orderId }, callback }: ReturnType<typeof nftMarketCancelBidAction>,
) {
  try {
    yield put(apiActions.request(type));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    yield contract.cancelBid(orderId).send({
      shouldPollResponse: true,
    });
    yield put(apiActions.success(type));
    yield toast.success('Bid cancel successful!');
    if (callback) callback();
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.Cancel_BID, nftMarketCancelBidSaga);
}
