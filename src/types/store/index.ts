import type { Location } from 'history';
import type { MeState } from './me';
import type { UIState } from './ui';
import type { TronState } from './tron';
import { NftMarketState } from './nftMarket';
import { WalletState } from '../../store/wallet/types';

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
  wallet: WalletState
};
