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
  function* success() {
    yield put(apiActions.success(type));
    yield toast.success('Bid cancel successful!');
    if (callback) callback();
  }
  try {
    yield put(apiActions.request(type));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    yield contract.cancelBid(orderId).send({
      shouldPollResponse: true,
    });
    yield success();
  } catch (err) {
    if (err.error === 'Cannot find result in solidity node') {
      yield success();
      return;
    }
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.Cancel_BID, nftMarketCancelBidSaga);
}
