import { toast } from 'react-toastify';
import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract, simpleErrorHandler } from 'utils';
import { nftMarketPutOnAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';

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
    const contractName = payload.marketType === MarketType.Auction
      ? process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
      : process.env.REACT_APP_CONTRACT_NFT_SALE as string;
    const contract =
      yield getTronContract(contractName);
    const price = window.tronWeb.toSun(payload.price);
    yield contract.acceptTokenToSell(payload.nftAddress, price, payload.maxDuration).send({
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
  yield takeLatest(NftMarketActionTypes.PUT_ON, nftMarketPutOnSaga);
}
