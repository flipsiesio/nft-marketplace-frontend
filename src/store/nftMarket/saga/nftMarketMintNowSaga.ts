import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import { Contract, ContractTransaction, ethers } from 'ethers';
import { nftMarketMintNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { simpleErrorHandler } from '../../../utils';
import { getCardRandomMinterContract } from '../../../utils/contracts';

function* nftMarketMintNowSaga(
  { type, payload, callback }: ReturnType<typeof nftMarketMintNowAction>,
) {
  try {
    yield put(apiActions.request(type));
    const contract: Contract =
      yield getCardRandomMinterContract();
    const nftPrice: ethers.BigNumber = yield contract.price();
    const tx: ContractTransaction = yield contract.mintRandom(
      payload,
      { value: nftPrice.toString() },
    );
    yield tx.wait();
    yield put(apiActions.success(type));
    callback(tx.hash);
    yield toast.success('Mint successful!');
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.MINT_NOW, nftMarketMintNowSaga);
}
