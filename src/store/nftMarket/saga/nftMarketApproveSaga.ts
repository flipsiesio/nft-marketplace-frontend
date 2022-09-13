import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { simpleErrorHandler } from 'utils';
import { Contract, ContractTransaction } from 'ethers';
import { nftMarketApproveAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';
import { getCardContract } from '../../../utils/contracts';

function* nftMarketApproveSaga(
  {
    payload, type, callback,
  }: ReturnType<typeof nftMarketApproveAction>,
) {
  function* success() {
    yield put(apiActions.success(type));
    callback(payload.actionType);
    yield toast.success('Approve successful!');
  }
  try {
    yield put(apiActions.request(type));
    const contract: Contract = yield getCardContract();
    const contractAddress = payload.actionType === MarketType.Sale
      ? process.env.REACT_APP_CONTRACT_NFT_SALE as string
      : process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string;
    const tx: ContractTransaction = yield contract.approve(contractAddress, payload.tokenId);
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
  yield takeLatest(NftMarketActionTypes.APPROVE, nftMarketApproveSaga);
}
