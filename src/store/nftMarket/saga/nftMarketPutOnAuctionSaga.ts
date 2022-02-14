import { toast } from 'react-toastify';
import {
  put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { tronSelector } from 'store/selectors';
import { getTronContract } from 'utils';
import { nftMarketPutOnAuctionAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketPutOnAuctionSaga(
  { payload, type, callback }: ReturnType<typeof nftMarketPutOnAuctionAction>,
) {
  try {
    yield put(apiActions.request(type));
    const from: string = yield select(tronSelector.getProp('address'));
    const contract =
      yield getTronContract(process.env.REACT_APP_CONTRACT_NFT_AUCTION as string);
    const maxExpirationDuration: string = yield contract.maxExpirationDuration().call();
    const maxDuration = Number(maxExpirationDuration);
    yield contract.createAuction(payload.nftAddress, maxDuration, payload.price).send({
      from,
    });
    yield put(apiActions.success(type));
    callback();
    yield toast.success('Put on auction successful!');
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.PUT_ON_AUCTION, nftMarketPutOnAuctionSaga);
}
