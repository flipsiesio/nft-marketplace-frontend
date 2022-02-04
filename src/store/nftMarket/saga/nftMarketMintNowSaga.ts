import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import { getTronContract } from 'utils/tronHelpers';
import { nftMarketMintNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { tronSelector } from '../../selectors';

function* nftMarketMintNowSaga(
  { type, payload, callback }: ReturnType<typeof nftMarketMintNowAction>,
) {
  try {
    yield put(apiActions.request(type));
    const from: string = yield select(tronSelector.getProp('address'));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string);
    yield contract.mintRandom(payload).send({
      from,
    });

    yield put(apiActions.success(type));
    callback();
    yield toast.success('Mint successful!');
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.MINT_NOW, nftMarketMintNowSaga);
}
