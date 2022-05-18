import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { cardsCliApiSaga } from 'store/api';
import { ApiResponse, CardMetadata, NftProperty } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetProfileAction, nftMarketSelectProfileAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

function* nftMarketGetProfileSaga({ type, payload }: ReturnType<typeof nftMarketGetProfileAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<CardMetadata> = yield call(cardsCliApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.CARD,
      params: {
        id: payload.id,
      },
    });

    const properties: NftProperty[] = Object.values(res.data.metadata.traits).map((trait) => ({
      rarity: trait.rarity ? `${parseFloat(trait.rarity).toFixed(2)}%` : '',
      name: trait.main.name,
      label: `${trait.main.color.name} (#${trait.main.color.color})`,
    }));

    yield put(nftMarketSelectProfileAction({
      id: Number(payload.id),
      suit: res.data.suit,
      face: res.data.face,
      listingPrice: '10',
      properties,
      owner: '',
      highestPrice: '10',
      faceRarity: '25%',
      suitRarity: '25%',
    }));
    console.log(res);
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_PROFILE, nftMarketGetProfileSaga);
}
