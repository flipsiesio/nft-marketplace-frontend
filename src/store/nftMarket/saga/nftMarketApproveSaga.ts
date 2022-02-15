import { toast } from 'react-toastify';
import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { nftMarketApproveAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketApproveSaga(
  {
    payload, type, callback,
  }: ReturnType<typeof nftMarketApproveAction>,
) {
  try {
    yield put(apiActions.request(type));
    const from: string = yield select(tronSelector.getProp('address'));
    const contractName = payload.actionType === 'sale' ?
      process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
      : process.env.REACT_APP_CONTRACT_NFT_AUCTION as string;
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_CARD as string);
    yield contract.approve(contractName, payload.tokenId).send({
      from,
    });
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
