import type { TronState } from 'types';
import { TronActionTypes } from './actionTypes';

export const connectTronAction = ({ meta }: { meta?: string }) => ({
  type: TronActionTypes.CONNECT,
  meta,
});

export const tronSetStateAction = (payload: Partial<TronState>) => ({
  type: TronActionTypes.SET_STATE,
  payload,
});

export const logoutTronAction = () => ({
  type: TronActionTypes.LOGOUT,
});
