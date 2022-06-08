import { NftDto, NftSuit, NftType } from 'types';
import { NftMarketState } from 'types/store';
import img from 'assets/img/card.png';
import { NftMarketAction, NftMarketActionTypes } from './actionTypes';

export const NftExample: NftDto = {
  cardId: 8,
  owner: '11',
  suit: NftSuit.CLUBS,
  suitRarity: '21.57',
  face: NftType.KING,
  faceRarity: '40.56',
  listingPrice: '0',
  highestPrice: '0',
  properties: [],
  url: img,
};

const initialState: NftMarketState = {
  gallery: [],
  market: [],
  myGallery: [],
  isAuth: false,
};

export default (state = initialState, action: NftMarketAction): NftMarketState => {
  switch (action.type) {
    case NftMarketActionTypes.SET_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case NftMarketActionTypes.SELECT_PROFILE: {
      const { payload } = action;
      return {
        ...state,
        selectedNft: payload,
      };
    }
    default:
      return state;
  }
};
