import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, CardDataForList } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetMyGalleryAction, nftMarketSetStateAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { simpleErrorHandler } from '../../../utils';

function* nftMarketGetMyGallerySaga(
  { type, payload }: ReturnType<typeof nftMarketGetMyGalleryAction>,
) {
  try {
    yield put(apiActions.request(type));
    // const myGalleryList: NftDto[] = yield select(nftMarketSelector.getProp('myGallery'));

    const res: ApiResponse<CardDataForList[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.PERSONAL_LIST,
      params: {
        ...payload,
        stateSale: true,
        stateBids: true,
      },
    });
    // const newItem = res.data.filter((i) => !myGalleryList.includes(i));
    // if (newItem.length > 0) yield put(nftMarketSetStateAction({ selectedNft: newItem[0] }));
    yield put(nftMarketSetStateAction({ myGallery: res.data }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_MY_GALLERY_LIST, nftMarketGetMyGallerySaga);
}
