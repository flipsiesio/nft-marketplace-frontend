import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import { getFeeString, getTronContract, simpleErrorHandler } from 'utils';
import apiActions from 'store/api/actions';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';
import { nftMarketBuyNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { nftMarketSelector } from '../../selectors';
import { NftMarketState } from '../../../types';

function* nftMarketBuyNowSaga(
  { type, callback }: ReturnType<typeof nftMarketBuyNowAction>,
) {
  function* success() {
    yield put(apiActions.success(type));
    yield toast.success('Buy successful!');
    callback();
  }
  try {
    const {
      selectedNft,
    }: NftMarketState = yield select(nftMarketSelector.getState);
    if (!selectedNft) return;

    yield put(apiActions.request(type));

    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_SALE as string);
    const price: BigNumber =
      new window.tronWeb.BigNumber(window.tronWeb.toSun(parseFloat(selectedNft.salePrice)));
    const feeInBps = yield contract.feeInBps().call();
    const maxFee = yield contract.MAX_FEE().call();
    const amountString = getFeeString(feeInBps, maxFee, price);

    yield contract.buy(selectedNft.orderId).send({
      callValue: amountString,
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
  yield takeLatest(NftMarketActionTypes.BUY_NOW, nftMarketBuyNowSaga);
}
