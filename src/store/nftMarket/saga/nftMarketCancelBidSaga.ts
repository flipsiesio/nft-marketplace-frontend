import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { simpleErrorHandler } from 'utils';
import { toast } from 'react-toastify';
import { Contract, ContractTransaction } from 'ethers';
import { nftMarketCancelBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { getNftMarketPlaceContract } from '../../../utils/contracts';

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
    const contract: Contract = yield getNftMarketPlaceContract();
    const tx: ContractTransaction = yield contract.cancelBid(orderId);
    yield tx.wait();
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
