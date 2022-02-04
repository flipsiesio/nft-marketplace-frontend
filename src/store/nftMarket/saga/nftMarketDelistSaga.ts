import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { nftMarketDelistAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketDelistSaga(
  { type }: ReturnType<typeof nftMarketDelistAction>,
) {
  try {
    yield put(apiActions.request(type));
    // TODO: need an NFT address here
    // const from: string = yield select(tronSelector.getProp('address'));
    // const contract =
    //   yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    // yield contract.getBackFromSale(nftAddress).send({
    //   from,
    // });
    yield put(apiActions.success(type));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.DELIST, nftMarketDelistSaga);
}
