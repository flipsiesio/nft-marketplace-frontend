import { Action } from '../../types';
import { WalletState } from './types';

export enum WalletActionType {
  SET_STATE = 'WALLET.SET_STATE',
  CONNECT = 'WALLET.CONNECT',
  DISCONNECT = 'WALLET.DISCONNECT',
}

export type WalletAction = Action<WalletActionType.CONNECT>
| Action<WalletActionType.SET_STATE, Partial<WalletState>>
| Action<WalletActionType.DISCONNECT>;
