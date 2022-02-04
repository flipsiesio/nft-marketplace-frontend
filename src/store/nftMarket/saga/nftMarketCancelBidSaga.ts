import {
  put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { nftMarketBidAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketCancelBidSaga(
  { type }: ReturnType<typeof nftMarketBidAction>,
) {
  try {
    yield put(apiActions.request(type));
    // TODO: need an NFT address here
    // const from: string = yield select(tronSelector.getProp('address'));
    // const contract =
    //   yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string);
    // yield contract.cancelBid(nftAddress).send({
    //   from,
    // });
    yield put(apiActions.success(type));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.CANCEL_BID, nftMarketCancelBidSaga);
}
