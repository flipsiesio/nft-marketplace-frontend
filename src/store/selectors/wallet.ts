import { WalletState } from '../wallet/types';
import { State } from '../../types';

export const walletSelectors = {
  getProp: <T extends keyof WalletState>(propKey: T) => (state: State) => state.wallet[propKey],
  getState: (state: State) => state.wallet,
};
