import { put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { simpleErrorHandler } from 'utils';
import { toast } from 'react-toastify';
import { Contract, ContractTransaction } from 'ethers';
import { getBackFromSaleAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';
import { getNftMarketPlaceContract, getNftSaleContract } from '../../../utils/contracts';

function* nftMarketGetBackFromSaleSaga(
  { type, payload: { marketType, orderId }, callback }: ReturnType<typeof getBackFromSaleAction>,
) {
  function* success() {
    yield put(apiActions.success(type));
    yield toast.success('Card back successes!');
    if (callback) callback();
  }
  try {
    yield put(apiActions.request(type));
    const contract: Contract = marketType === MarketType.Auction
      ? yield getNftMarketPlaceContract()
      : yield getNftSaleContract();
    const tx: ContractTransaction = yield contract.getBackFromSale(orderId);
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
  yield takeLatest(NftMarketActionTypes.GET_BACK_FROM_SALE, nftMarketGetBackFromSaleSaga);
}
