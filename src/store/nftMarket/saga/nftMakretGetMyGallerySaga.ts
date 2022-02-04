import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, NftRes } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetMyGalleryAction, nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetMyGallerySaga(
  { type, payload }: ReturnType<typeof nftMarketGetMyGalleryAction>,
) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<NftRes[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.PERSONAL_LIST,
      params: payload,
    });

    yield put(nftMarketSetStateAction({ myGallery: res.data }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_MY_GALLERY_LIST, nftMarketGetMyGallerySaga);
}
