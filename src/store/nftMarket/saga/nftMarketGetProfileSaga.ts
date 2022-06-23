import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import apiActions from 'store/api/actions';
import { marketApiSaga } from 'store/api';
import {
  ApiResponse, CardData, NftProperty,
} from 'types';
import { marketURL } from 'appConstants';
import { nftMarketGetProfileAction, nftMarketSelectProfileAction } from '../actions';
import { NftMarketActionTypes } from '../actionTypes';
import { fromSunToNumber, getBidPrice } from '../../../utils';

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

    const res: ApiResponse<CardData> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.CARD,
      params: {
        stateSale: true,
        stateBids: true,
        cardsId: [payload.id],
        traits: true,
      },
    });

    const properties: NftProperty[] = Object
      .values(res.data.traits)
      .map((trait) => ({
        rarity: trait.frequency ? percent(trait.frequency) : '',
        name: trait.main.name[0].toUpperCase() + trait.main.name.slice(1),
        label: `${trait.main.color.name} (#${trait.main.color.color})`,
      }))
      .filter((trait) => !exceptionsProperty.includes(trait.name));

    yield put(nftMarketSelectProfileAction({
      cardId: Number(payload.id),
      orderId: res.data.state_bids?.orderIndex || res.data.state_sale?.orderIndex,
      suit: res.data.suit,
      face: res.data.face,
      properties,
      owner: '',
      faceRarity: percent(res.data.faceFrequency),
      suitRarity: percent(res.data.suitFrequency),
      url: res.data.url,
      bidPrice: getBidPrice(res.data.state_bids),
      salePrice: res.data.state_sale?.price ? `${fromSunToNumber(res.data.state_sale.price)}` : '0',
    }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_PROFILE, nftMarketGetProfileSaga);
}
