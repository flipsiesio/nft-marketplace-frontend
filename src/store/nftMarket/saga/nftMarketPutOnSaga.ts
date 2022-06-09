import { toast } from 'react-toastify';
import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract } from 'utils';
import { nftMarketPutOnAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { MarketType } from '../../../types';

function* nftMarketPutOnSaga(
  { payload, type, callback }: ReturnType<typeof nftMarketPutOnAction>,
) {
  try {
    yield put(apiActions.request(type));
    const contractName = payload.marketType === MarketType.Sale
      ? process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
      : process.env.REACT_APP_CONTRACT_NFT_SALE as string;
    const contract =
      yield getTronContract(contractName);
    const maxExpirationDuration: string = yield contract.maxExpirationDuration().call();
    const maxDuration = Number(maxExpirationDuration);
    const price = window.tronWeb.toSun(payload.price);
    yield contract.acceptTokenToSell(payload.nftAddress, price, maxDuration).send();
    yield put(apiActions.success(type));
    callback();
    const label = MarketType.Sale ? 'sale' : 'auction';
    yield toast.success(`Put on ${label} successful!`);
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.PUT_ON, nftMarketPutOnSaga);
}
