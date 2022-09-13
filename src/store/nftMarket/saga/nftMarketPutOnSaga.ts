import { toast } from 'react-toastify';
import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { simpleErrorHandler } from 'utils';
import { Contract, ContractTransaction, ethers } from 'ethers';
import { nftMarketPutOnAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';
import { getNftMarketPlaceContract, getNftSaleContract } from '../../../utils/contracts';

function* nftMarketPutOnSaga(
  { payload, type, callback }: ReturnType<typeof nftMarketPutOnAction>,
) {
  function* success() {
    yield put(apiActions.success(type));
    callback();
    const label = MarketType.Sale === payload.marketType ? 'sale' : 'auction';
    yield toast.success(`Put on ${label} successful!`);
  }
  try {
    yield put(apiActions.request(type));
    const contract: Contract = payload.marketType === MarketType.Auction
      ? yield getNftMarketPlaceContract()
      : yield getNftSaleContract();
    const price = ethers.utils.parseUnits(`${payload.price}`, 18).toString();
    const tx: ContractTransaction =
      yield contract.acceptTokenToSell(payload.nftAddress, price, payload.maxDuration);
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
  yield takeLatest(NftMarketActionTypes.PUT_ON, nftMarketPutOnSaga);
}
