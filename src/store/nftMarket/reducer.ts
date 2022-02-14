import { NftSuit, NftType } from 'types';
import { NftMarketState } from 'types/store';
import { NftMarketAction, NftMarketActionTypes } from './actionTypes';

export const NftExample = {
  id: 8,
  name: 'KING CLUBS 11',
  owner: '11',
  suit: NftSuit.CLUBS,
  suitRarity: '21.57',
  face: NftType.KING,
  faceRarity: '40.56',
  clothes: 'Downriver (#0a0c57)',
  clothesRarity: '0.67',
  background: 'Hibiscus (#a62666)',
  backgroundRarity: '0.55',
  hair: 'null',
  hairRarity: '0.02',
  borderline: 'Blue Ribbon (#4343fd)',
  borderlineRarity: '0.39',
  egg: 'url(#pattern0)',
  eggRarity: '6.08',
  teardrop: 'Cornflower Blue (#5193ED)',
  teardropRarity: '5',
  listingPrice: '0',
  highestPrice: '0',
};

const initialState: NftMarketState = {
  gallery: [],
  market: [NftExample],
  myGallery: [NftExample],
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
