import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, NftDto } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketSelector } from 'store/selectors';
import { nftMarketGetMyGalleryAction, nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetMyGallerySaga(
  { type, payload }: ReturnType<typeof nftMarketGetMyGalleryAction>,
) {
  try {
    yield put(apiActions.request(type));
    const myGalleryList: NftDto[] = yield select(nftMarketSelector.getProp('myGallery'));

    const res: ApiResponse<NftDto[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.PERSONAL_LIST,
      params: payload,
    });
    const newItem = res.data.filter((i) => !myGalleryList.includes(i));
    if (newItem.length > 0) yield put(nftMarketSetStateAction({ selectedNft: newItem[0] }));
    yield put(nftMarketSetStateAction({ myGallery: res.data }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_MY_GALLERY_LIST, nftMarketGetMyGallerySaga);
}
