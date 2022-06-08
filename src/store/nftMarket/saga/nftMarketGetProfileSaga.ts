import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import { ApiResponse, CardMetadata, NftProperty } from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetProfileAction, nftMarketSelectProfileAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';

const percent = (value?: number) => {
  if (value === undefined) return '';

  if (Number.isInteger(value)) {
    return `${value}%`;
  }

  return `${value.toFixed((3))}%`;
};

const exceptionsProperty = ['CardSuit'];

function* nftMarketGetProfileSaga({ type, payload }: ReturnType<typeof nftMarketGetProfileAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<CardMetadata> = yield call(marketApiSaga, {
      method: 'get',
      url: `${marketURL.MARKETPLACE.CARD}/${payload.id}`,
    });

    const properties: NftProperty[] = Object.values(res.data.metadata.traits).map((trait) => ({
      rarity: trait.frequency ? percent(trait.frequency) : '',
      name: trait.main.name[0].toUpperCase() + trait.main.name.slice(1),
      label: `${trait.main.color.name} (#${trait.main.color.color})`,
    })).filter((trait) => !exceptionsProperty.includes(trait.name));

    yield put(nftMarketSelectProfileAction({
      cardId: Number(payload.id),
      suit: res.data.suit,
      face: res.data.face,
      listingPrice: '10',
      properties,
      owner: '',
      highestPrice: '10',
      faceRarity: percent(res.data.metadata.faceFrequency),
      suitRarity: percent(res.data.metadata.suitFrequency),
      url: res.data.metadata.url,
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
