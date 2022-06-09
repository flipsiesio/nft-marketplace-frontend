import { toast } from 'react-toastify';
import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { getTronContract } from 'utils';
import { nftMarketPutOnSaleAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketPutOnSaleSaga(
  { payload, type, callback }: ReturnType<typeof nftMarketPutOnSaleAction>,
) {
  try {
    yield put(apiActions.request(type));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_SALE as string);
    const maxExpirationDuration: string = yield contract.maxExpirationDuration().call();
    const maxDuration = Number(maxExpirationDuration);
    const price = window.tronWeb.toSun(payload.price);
    yield contract.acceptTokenToSell(payload.nftAddress, price, maxDuration).send();
    yield put(apiActions.success(type));
    callback();
    yield toast.success('Put on sale successful!');
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.PUT_ON_SALE, nftMarketPutOnSaleSaga);
}
