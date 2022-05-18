import type { Location } from 'history';
import type { MeState } from './me';
import type { UIState } from './ui';
import type { TronState } from './tron';
import { NftMarketState } from './nftMarket';

export * from './me';
export * from './ui';
export * from './tron';
export * from './nftMarket';

export type State = {
  router: {
    location: Location;
  };
  me: MeState;
  tron: TronState,
  ui: UIState;
  nftMarket: NftMarketState,
};
