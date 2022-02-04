/* eslint-disable max-len */
import type {
  Action,
  TrxUsdRateRes,
} from 'types';

const UPDATE_TRX_USD_RATE = 'UPDATE_TRX_USD_RATE';

export type UpdateTrxUsdRate = Action<typeof UPDATE_TRX_USD_RATE, TrxUsdRateRes>;

export default {
  UPDATE_TRX_USD_RATE,
};
