import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import { getTronContract } from 'utils';
import { tronSelector } from 'store/selectors';
import apiActions from 'store/api/actions';
import { nftMarketBuyNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketBuyNowSaga(
  { type, payload, callback }: ReturnType<typeof nftMarketBuyNowAction>,
) {
  try {
    yield put(apiActions.request(type));

    const from: string = yield select(tronSelector.getProp('address'));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_SALE as string);
    yield contract.buy(payload).send({
      from,
    });

    yield put(apiActions.success(type));
    callback();
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.BUY_NOW, nftMarketBuyNowSaga);
}
