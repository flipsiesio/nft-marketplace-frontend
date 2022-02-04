import {
  Action,
  TronState,
} from 'types';

export enum TronActionTypes {
  CONNECT = 'TRON.CONNECT',
  CONNECT_SUCCESS = 'TRON.CONNECT_SUCCESS',

  LOGOUT = 'TRON.LOGOUT',
  LOGOUT_SUCCESS = 'TRON.LOGOUT_SUCCESS',

  SET_STATE = 'TRON.SET_STATE',
}

export type TronAction =
 | Action<TronActionTypes.CONNECT>
 | Action<TronActionTypes.CONNECT_SUCCESS, TronState>
 | Action<TronActionTypes.LOGOUT>
 | Action<TronActionTypes.LOGOUT_SUCCESS, TronState>
 | Action<TronActionTypes.SET_STATE, Partial<TronState>>;
