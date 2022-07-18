import { NftMarketState } from 'types/store';
import { NftMarketAction, NftMarketActionTypes } from './actionTypes';

const initialState: NftMarketState = {
  myBids: [],
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
