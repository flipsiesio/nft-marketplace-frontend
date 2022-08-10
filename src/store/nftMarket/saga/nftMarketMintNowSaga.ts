import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import { Contract, ContractTransaction } from 'ethers';
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
    // const nftPrice = yield contract.price();
    const tx: ContractTransaction = yield contract.mintRandom(payload, { value: 10 });
    yield tx.wait();
    yield put(apiActions.success(type));
    callback('');
    yield toast.success('Mint successful!');
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.MINT_NOW, nftMarketMintNowSaga);
}
