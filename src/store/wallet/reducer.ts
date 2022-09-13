import { WalletState, WalletStatus } from './types';
import { WalletAction, WalletActionType } from './actionTypes';

export const metamaskInitialState: Readonly<WalletState> = {
  address: '',
  status: WalletStatus.INIT,
  balance: 0,
  network: null,
};

export default (
  state = metamaskInitialState,
  action: WalletAction,
): WalletState => {
  switch (action.type) {
    case WalletActionType.SET_STATE: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return state;
  }
};
