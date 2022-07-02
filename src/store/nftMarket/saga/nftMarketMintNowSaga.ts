import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { toast } from 'react-toastify';
import { getTronContract } from 'utils/tronHelpers';
import { nftMarketMintNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { tronSelector } from '../../selectors';
import { simpleErrorHandler } from '../../../utils';

function* nftMarketMintNowSaga(
  { type, payload, callback }: ReturnType<typeof nftMarketMintNowAction>,
) {
  try {
    yield put(apiActions.request(type));
    const from: string = yield select(tronSelector.getProp('address'));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string);
    const nftPrice = yield contract.price().call();
    const trxHash = yield contract.mintRandom(payload).send({
      from,
      callValue: nftPrice.toString(),
    });
    yield put(apiActions.success(type));
    callback(trxHash);
    yield toast.success('Mint successful!');
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.MINT_NOW, nftMarketMintNowSaga);
}
