import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import { simpleErrorHandler, getFeeString1 } from 'utils';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import { Contract, ContractTransaction, ethers } from 'ethers';
import { nftMarketBuyNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { nftMarketSelector } from '../../selectors';
import { NftMarketState } from '../../../types';
import { getNftSaleContract } from '../../../utils/contracts';

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

    const contract: Contract = yield getNftSaleContract();
    const price: ethers.BigNumber = yield contract.getSellOrderPrice(0);
    const feeInBps: ethers.BigNumber = yield contract.feeInBps();
    const maxFee: ethers.BigNumber = yield contract.MAX_FEE();
    const amountString = getFeeString1(feeInBps, maxFee, price);
    const tx: ContractTransaction = yield contract.buy(0, { value: amountString });
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
  yield takeLatest(NftMarketActionTypes.BUY_NOW, nftMarketBuyNowSaga);
}
