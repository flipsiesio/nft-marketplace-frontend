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
import { fromWeiToNumber, simpleErrorHandler, getBidPrice } from '../../../utils';

const percent = (value?: number) => {
  if (value === undefined) return '';

  if (Number.isInteger(value)) {
    return `${value}%`;
  }

  return `${(value).toFixed((3))}%`;
};

const getCardName = (name: string) => {
  if (name === 'cardSuit') return 'Borderline ';

  return name[0].toUpperCase() + name.slice(1);
};

const getOrderIndex = (firstOrderId?: number, secondOrderId?: number) => {
  if (firstOrderId !== undefined) {
    return firstOrderId;
  }

  if (secondOrderId !== undefined) {
    return secondOrderId;
  }
  return undefined;
};

function* nftMarketGetProfileSaga({ type, payload }: ReturnType<typeof nftMarketGetProfileAction>) {
  try {
    yield put(apiActions.request(type));

    const res: ApiResponse<CardData[]> = yield call(marketApiSaga, {
      method: 'get',
      url: marketURL.MARKETPLACE.CARD,
      params: {
        stateSale: true,
        stateBids: true,
        cardsId: [payload.id],
        traits: true,
      },
    });

    const currentCard = res.data[0];

    const properties: NftProperty[] = Object
      .values(currentCard.traits)
      .map((trait) => ({
        rarity: trait.frequency ? percent(trait.frequency) : '',
        name: getCardName(trait.main.name),
        label: `${trait.main.color.name} (#${trait.main.color.color})`,
      }));

    const isActive = currentCard.state_bids?.active || currentCard.state_sale?.active;

    yield put(nftMarketSelectProfileAction({
      active: currentCard.state_bids?.active || currentCard.state_sale?.active || false,
      cardId: Number(payload.id),
      orderId:
        getOrderIndex(currentCard.state_bids?.orderIndex, currentCard.state_sale?.orderIndex),
      suit: currentCard.suit,
      face: currentCard.face,
      properties,
      owner: isActive ? (currentCard.state_sale?.seller ||
        currentCard.state_bids?.seller) :
        currentCard.ownerAddress,
      faceRarity: percent(currentCard.faceFrequency),
      suitRarity: percent(currentCard.suitFrequency),
      url: currentCard.url,
      bidPrice: getBidPrice(currentCard.state_bids),
      salePrice: currentCard.state_sale?.price ? `${fromWeiToNumber(currentCard.state_sale.price)}` : '0',
      expirationTime: currentCard.state_sale?.expirationTime ||
        currentCard.state_bids?.expirationTime,
      bids: currentCard.state_bids?.bids,
    }));
    yield put(apiActions.success(type, res.data));
  } catch (err) {
    simpleErrorHandler(err);
    yield put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(NftMarketActionTypes.GET_PROFILE, nftMarketGetProfileSaga);
}
