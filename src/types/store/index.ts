import type { Location } from 'history';
import type { MeState } from './me';
import type { UIState } from './ui';
import type { BetsHistoryState } from './betsHistory';
import type { TrxUsdRateState } from './trxUsdRate';
import type { JackpotState } from './jackpot';
import type { TronState } from './tron';
import type { ReferralState } from './referral';
import type { GameState } from './game';
import { NftMarketState } from './nftMarket';

export * from './me';
export * from './ui';
export * from './betsHistory';
export * from './trxUsdRate';
export * from './jackpot';
export * from './tron';
export * from './referral';
export * from './game';
export * from './nftMarket';

export type State = {
  router: {
    location: Location;
  };
  me: MeState;
  tron: TronState,
  ui: UIState;
  betsHistory: BetsHistoryState;
  trxUsdRate: TrxUsdRateState;
  jackpot: JackpotState;
  referral: ReferralState,
  game: GameState,
  nftMarket: NftMarketState,
};
