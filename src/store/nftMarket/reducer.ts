import { NftDto, NftSuit, NftType } from 'types';
import { NftMarketState } from 'types/store';
import { NftMarketAction, NftMarketActionTypes } from './actionTypes';

export const NftExample: NftDto = {
  id: 8,
  owner: '11',
  suit: NftSuit.CLUBS,
  suitRarity: '21.57',
  face: NftType.KING,
  faceRarity: '40.56',
  listingPrice: '0',
  highestPrice: '0',
  properties: [],
};

const initialState: NftMarketState = {
  gallery: [],
  market: [NftExample],
  myGallery: [NftExample],
  isAuth: false,
  selectedNft: NftExample,
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
      if (payload) {
        return {
          ...state,
          selectedNft: payload,
        };
      }
      return state;
    }
    default:
      return state;
  }
};
