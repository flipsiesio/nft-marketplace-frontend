import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { simpleErrorHandler } from 'utils';
import { toast } from 'react-toastify';
import { ContractTransaction, Contract } from 'ethers';
import { nftMarketAcceptBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { getNftMarketPlaceContract } from '../../../utils/contracts';

function* nftMarketAcceptBidSaga(
  {
    type,
    payload: { payerAddress, orderId }, callback,
  }: ReturnType<typeof nftMarketAcceptBidAction>,
) {
  function* success() {
    yield put(apiActions.success(type));
    yield toast.success('Bid accept successful!');
    if (callback) callback();
  }

  try {
    yield put(apiActions.request(type));
    const contract: Contract = yield getNftMarketPlaceContract();
    const tx: ContractTransaction = yield contract.performBuyOperation(payerAddress, orderId);
    yield tx.wait();
    yield success();
  } catch (err) {
    if (err.error === 'Cannot find result in solidity node') {
      yield success();
      return;
    }
    yield put(apiActions.error(type, err));
    simpleErrorHandler(err);
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.ACCEPT_BID, nftMarketAcceptBidSaga);
}
