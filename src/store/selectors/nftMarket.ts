import { NftMarketState, State } from 'types/store';

export default {
  getProp: <T extends keyof NftMarketState>
  (key: T) => (state: State) => state.nftMarket[key],
  getState: (state: State) => state.nftMarket,
};
