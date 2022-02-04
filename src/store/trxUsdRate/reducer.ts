import type { TrxUsdRateState } from 'types';
import actionTypes, { UpdateTrxUsdRate } from './actionTypes';

const initialState: TrxUsdRateState = {
  rate: 0,
};

// eslint-disable-next-line max-len
export default (state: TrxUsdRateState = initialState, action: UpdateTrxUsdRate): TrxUsdRateState => {
  switch (action.type) {
    case actionTypes.UPDATE_TRX_USD_RATE: {
      if (action.payload) {
        const { rate } = action.payload;
        return {
          ...state,
          rate,
        };
      }

      return state;
    }

    default:
      return state;
  }
};
