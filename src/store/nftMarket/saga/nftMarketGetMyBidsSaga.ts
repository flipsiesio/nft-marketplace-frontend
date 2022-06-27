import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, CardDataForList } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetMyBidsAction, nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetMyBidsSaga({ type, payload }: ReturnType<typeof nftMarketGetMyBidsAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<CardDataForList[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.MY_BIDS_LIST,
      params: {
        ...payload,
        stateSale: true,
      },
    });

    yield put(nftMarketSetStateAction({ myBids: res.data }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_MY_BIDS_LIST, nftMarketGetMyBidsSaga);
}
