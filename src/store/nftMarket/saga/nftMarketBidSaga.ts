import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getFeeString1, simpleErrorHandler } from 'utils';
import { toast } from 'react-toastify';
import { ContractTransaction, ethers } from 'ethers';
import { nftMarketBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { getNftMarketPlaceContract } from '../../../utils/contracts';

function* nftMarketBidSaga(
  { type, payload, successCallback }: ReturnType<typeof nftMarketBidAction>,
) {
  function* success() {
    yield put(apiActions.success(type));
    yield toast.success('Bid accept successful!');
    if (successCallback) successCallback();
  }

  try {
    yield put(apiActions.request(type));
    const price = ethers.utils.parseUnits(payload.price, 18);

    const contract = yield getNftMarketPlaceContract();
    const feeInBps: ethers.BigNumber = yield contract.feeInBps();
    const maxFee: ethers.BigNumber = yield contract.MAX_FEE();

    const amountString: string = getFeeString1(feeInBps, maxFee, price);
    const tx: ContractTransaction = yield contract.bid(`${payload.id}`, price.toString(), { value: amountString });
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
  yield takeLatest(NftMarketActionTypes.BID, nftMarketBidSaga);
}
