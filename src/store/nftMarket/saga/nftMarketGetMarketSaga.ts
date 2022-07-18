import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, CardDataForList } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetMarketAction, nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { simpleErrorHandler } from '../../../utils';

function* nftMarketGetMarketSaga({ type, payload }: ReturnType<typeof nftMarketGetMarketAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<CardDataForList[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.MARKET_LIST,
      params: {
        ...payload,
        stateBids: true,
      },
    });

    yield put(nftMarketSetStateAction({ market: res.data }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_MARKET_LIST, nftMarketGetMarketSaga);
}
