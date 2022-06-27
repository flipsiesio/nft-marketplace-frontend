import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract } from 'utils';
import { nftMarketDelistAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';

function* nftMarketDelistSaga(
  { type, payload, callback }: ReturnType<typeof nftMarketDelistAction>,
) {
  try {
    yield put(apiActions.request(type));
    const contractName = payload.marketType === MarketType.Sale
      ? process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
      : process.env.REACT_APP_CONTRACT_NFT_SALE as string;
    const contract =
      yield getTronContract(contractName);
    yield contract.getBackFromSale(payload.orderId).send({
      shouldPollResponse: true,
    });
    yield put(apiActions.success(type));
    callback(payload.marketType);
    const label = MarketType.Sale ? 'sale' : 'auction';
    yield toast.success(`Cancel the ${label} successful!`);
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.DELIST, nftMarketDelistSaga);
}
