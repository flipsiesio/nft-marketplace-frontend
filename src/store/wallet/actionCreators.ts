import { WalletState } from './types';
import { WalletActionType } from './actionTypes';

export const walletSetState = (payload: Partial<WalletState>) => ({
  type: WalletActionType.SET_STATE,
  payload,
});

export const walletConnect = (appStartWalletConnect = false) => ({
  type: WalletActionType.CONNECT,
  appStartWalletConnect,
});

export const walletDisconnect = (payload?: Pick<WalletState, 'status'>) => ({
  type: WalletActionType.DISCONNECT,
  payload,
});
