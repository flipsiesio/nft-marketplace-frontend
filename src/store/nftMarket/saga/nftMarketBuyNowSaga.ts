import {
  put, takeLatest,
} from 'redux-saga/effects';
import { getFeeString, getTronContract } from 'utils';
import apiActions from 'store/api/actions';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';
import { nftMarketBuyNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketBuyNowSaga(
  { type, payload, callback }: ReturnType<typeof nftMarketBuyNowAction>,
) {
  try {
    yield put(apiActions.request(type));

    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_SALE as string);
    const price: BigNumber = new window.tronWeb.BigNumber(payload.price);
    const feeInBps = yield contract.feeInBps().call();
    const maxFee = yield contract.MAX_FEE().call();
    const amountString = getFeeString(feeInBps, maxFee, price);

    yield contract.buy(payload.id).send({
      callValue: amountString,
    });

    yield put(apiActions.success(type));
    yield toast.success('Buy successful!');
    callback();
  } catch (err) {
    yield toast.success('Error Buy');
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.BUY_NOW, nftMarketBuyNowSaga);
}
