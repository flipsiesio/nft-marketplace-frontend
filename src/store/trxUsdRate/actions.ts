import type { TrxUsdRateRes } from 'types';
import actionTypes from './actionTypes';

export const updateTrxUsdRate = (payload: TrxUsdRateRes) => ({
  type: actionTypes.UPDATE_TRX_USD_RATE,
  payload,
});
