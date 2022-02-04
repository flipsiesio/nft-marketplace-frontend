import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { nftMarketPutOnSaleAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketPutOnSaleSaga(
  { type }: ReturnType<typeof nftMarketPutOnSaleAction>,
) {
  try {
    yield put(apiActions.request(type));
    // TODO: need an NFT address here
    // const from: string = yield select(tronSelector.getProp('address'));
    // const contract =
    //   yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    // const maxExpirationDuration = yield contract.maxExpirationDuration().call();
    // const maxDuration = maxExpirationDuration.toNumber();
    // yield contract.acceptTokenToSell(nftAddress, payload, maxDuration).send({
    //   from,
    // });
    yield put(apiActions.success(type));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.PUT_ON_SALE, nftMarketPutOnSaleSaga);
}
