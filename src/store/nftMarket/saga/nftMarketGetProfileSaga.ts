import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetProfileAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetProfileSaga({ type }: ReturnType<typeof nftMarketGetProfileAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<string> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.AUTH.PROFILE,
    });
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_PROFILE, nftMarketGetProfileSaga);
}
