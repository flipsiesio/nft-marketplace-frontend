import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract } from 'utils';
import BigNumber from 'bignumber.js';
import { nftMarketBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketBidSaga(
  { type, payload }: ReturnType<typeof nftMarketBidAction>,
) {
  try {
    yield put(apiActions.request(type));
    // TODO: TO SUN
    // console.log(window.tronWeb.toSun(0.1));
    const price: BigNumber = new window.tronWeb.BigNumber(payload.price);

    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    const feeInBps = yield contract.feeInBps().call();
    const maxFee = yield contract.MAX_FEE().call();

    const calcFee = price.multipliedBy(feeInBps.toBigInt()).div(maxFee.toBigInt());
    const amount = price.plus(calcFee);
    const amountString = amount.integerValue(BigNumber.ROUND_CEIL).toString();
    yield contract.bid(`${payload.id}`, payload.price).send({
      callValue: amountString,
    });
    yield put(apiActions.success(type));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.BID, nftMarketBidSaga);
}
