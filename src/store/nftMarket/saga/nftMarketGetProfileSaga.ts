import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { cardsCliApiSaga } from 'store/api';
import { ApiResponse } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetProfileAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetProfileSaga({ type, payload }: ReturnType<typeof nftMarketGetProfileAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<string> = yield call(cardsCliApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.CARD_SVG,
      params: {
        id: payload.id,
      },
    });
    console.log(res);
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_PROFILE, nftMarketGetProfileSaga);
}
