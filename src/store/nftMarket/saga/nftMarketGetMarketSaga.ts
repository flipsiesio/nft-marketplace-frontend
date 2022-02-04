import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, NftRes } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetMarketAction, nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetMarketSaga({ type, payload }: ReturnType<typeof nftMarketGetMarketAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<NftRes[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.MARKET_LIST,
      params: payload,
    });

    yield put(nftMarketSetStateAction({ market: res.data }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_MARKET_LIST, nftMarketGetMarketSaga);
}
