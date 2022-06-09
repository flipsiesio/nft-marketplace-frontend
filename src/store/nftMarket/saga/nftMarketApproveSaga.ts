import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract } from 'utils';
import { nftMarketApproveAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';

function* nftMarketApproveSaga(
  {
    payload, type, callback,
  }: ReturnType<typeof nftMarketApproveAction>,
) {
  try {
    yield put(apiActions.request(type));
    const contractName = payload.actionType === MarketType.Sale ?
      process.env.REACT_APP_CONTRACT_NFT_SALE as string
      : process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string;
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_CARD as string);
    yield contract.approve(contractName, payload.tokenId).send();
    yield put(apiActions.success(type));
    callback(payload.actionType);
    yield toast.success('Approve successful!');
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.APPROVE, nftMarketApproveSaga);
}
