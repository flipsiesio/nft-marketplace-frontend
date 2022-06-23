import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, CardDataForList } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetGalleryAction, nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetGallerySaga({ type, payload }: ReturnType<typeof nftMarketGetGalleryAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<CardDataForList[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.GALLERY_LIST,
      params: payload,
    });

    yield put(nftMarketSetStateAction({ gallery: res.data }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_GALLERY_LIST, nftMarketGetGallerySaga);
}
