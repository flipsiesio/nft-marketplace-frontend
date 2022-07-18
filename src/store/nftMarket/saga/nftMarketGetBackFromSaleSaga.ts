import { put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract, simpleErrorHandler } from 'utils';
import { toast } from 'react-toastify';
import { getBackFromSaleAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';

function* nftMarketGetBackFromSaleSaga(
  { type, payload: { marketType, orderId }, callback }: ReturnType<typeof getBackFromSaleAction>,
) {
  try {
    yield put(apiActions.request(type));
    const contractName = marketType === MarketType.Auction
      ? process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
      : process.env.REACT_APP_CONTRACT_NFT_SALE as string;
    const contract =
      yield getTronContract(contractName);
    yield contract.getBackFromSale(orderId).send({
      shouldPollResponse: true,
    });
    yield put(apiActions.success(type));
    yield toast.success('Card back successes!');
    if (callback) callback();
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_BACK_FROM_SALE, nftMarketGetBackFromSaleSaga);
}
