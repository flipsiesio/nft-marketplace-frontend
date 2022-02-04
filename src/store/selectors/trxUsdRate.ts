import type { State, TrxUsdRateState } from 'types';

export default {
  getProp: <T extends keyof TrxUsdRateState>
  (propKey: T) => (state: State) => state.trxUsdRate[propKey],

  getState: (state: State) => state.trxUsdRate,
};
