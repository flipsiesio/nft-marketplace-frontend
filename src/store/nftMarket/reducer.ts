import { NftMarketState } from 'types/store';
import { NftMarketAction, NftMarketActionTypes } from './actionTypes';
import { NftSuit } from '../../types';

const initialState: NftMarketState = {
  gallery: [{
    cardId: 1,
  }],
  market: [{
    cardId: 1,
  }],
  selectedNft: {
    id: 1, highestPrice: 10, listingPrice: 10, type: '1', attribute: '1', owner: '1', suit: NftSuit.Spades,
  },
  myGallery: [{
    cardId: 1,
  }],
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
