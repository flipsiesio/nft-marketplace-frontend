import { NftMarketState, NftDto } from 'types';
import { NftMarketAction, NftMarketActionTypes } from './actionTypes';

const initialState: NftMarketState = {
  myBids: [],
  gallery: [],
  market: [],
  myGallery: [],
  isAuth: false,
  selectedNft: undefined,
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
        selectedNft: payload ? payload as NftDto : undefined,
      };
    }
    default:
      return state;
  }
};
