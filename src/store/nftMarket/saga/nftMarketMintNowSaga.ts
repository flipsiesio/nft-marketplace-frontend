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
    const nftPrice: ethers.BigNumber = yield contract.getMintPrice(payload.token);

    const increaseGasLimit = (estimatedGasLimit: ethers.BigNumber) => {
      return estimatedGasLimit.mul(130).div(100); // increase by 30%
    };

    const gasLimit: ethers.BigNumber = yield contract.estimateGas.mintRandom(
      payload.amount,
      payload.token,
      {
        value: nftPrice.mul(payload.amount).toString(),
      },
    );

    const tx: ContractTransaction = yield contract.mintRandom(
      payload.amount,
      payload.token,
      {
        value: nftPrice.mul(payload.amount).toString(),
        gasLimit: increaseGasLimit(gasLimit),
      },
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
