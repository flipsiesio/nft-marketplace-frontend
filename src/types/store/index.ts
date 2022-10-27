import type { Location } from 'history';
import { WalletState } from 'store/wallet/types';
import { AdminState } from './AdminState';
import type { MeState } from './me';
import type { UIState } from './ui';
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
  ui: UIState;
  nftMarket: NftMarketState;
  wallet: WalletState;
  admin: AdminState;
};
