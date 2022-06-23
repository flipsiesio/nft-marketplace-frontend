import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getFeeString, getTronContract } from 'utils';
import BigNumber from 'bignumber.js';
import { toast } from 'react-toastify';
import { nftMarketBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketBidSaga(
  { type, payload, successCallback }: ReturnType<typeof nftMarketBidAction>,
) {
  try {
    yield put(apiActions.request(type));
    const price: BigNumber =
      new window.tronWeb.BigNumber(window.tronWeb.toSun(parseFloat(payload.price)));

    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    const feeInBps = yield contract.feeInBps().call();
    const maxFee = yield contract.MAX_FEE().call();

    const amountString: string = getFeeString(feeInBps, maxFee, price);
    yield contract.bid(`${payload.id}`, price.toString()).send({
      callValue: amountString,
    });
    successCallback();
    yield put(apiActions.success(type));
    yield toast.success('Bid successful!');
  } catch (err) {
    yield toast.error('Error Bid');
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.BID, nftMarketBidSaga);
}
