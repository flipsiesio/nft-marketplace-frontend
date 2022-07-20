import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract, simpleErrorHandler } from 'utils';
import { toast } from 'react-toastify';
import { nftMarketAcceptBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

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
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    yield contract.performBuyOperation(payerAddress, orderId).send({
      shouldPollResponse: true,
    });
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
