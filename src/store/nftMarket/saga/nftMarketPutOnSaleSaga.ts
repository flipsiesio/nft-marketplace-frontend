import { toast } from 'react-toastify';
import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { nftMarketPutOnSaleAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketPutOnSaleSaga(
  { payload, type, callback }: ReturnType<typeof nftMarketPutOnSaleAction>,
) {
  try {
    yield put(apiActions.request(type));
    // TODO: need an NFT address here
    const from: string = yield select(tronSelector.getProp('address'));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    const maxExpirationDuration: string = yield contract.maxExpirationDuration().call();
    const maxDuration = Number(maxExpirationDuration);
    yield contract.acceptTokenToSell(payload.nftAddress, payload.price, maxDuration).send({
      from,
    });
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
