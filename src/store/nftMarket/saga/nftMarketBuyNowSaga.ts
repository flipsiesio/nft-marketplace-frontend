import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, NftDto } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketBuyNowAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketBuyNowSaga(
  { type, payload }: ReturnType<typeof nftMarketBuyNowAction>,
) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<NftDto[]> = yield call(marketApiSaga, {
      method: 'post',
      url: marketURL.MARKETPLACE.BUY_NOW(payload),
    });

    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.BUY_NOW, nftMarketBuyNowSaga);
}
