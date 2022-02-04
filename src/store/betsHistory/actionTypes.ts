import type { Action, GameHistoryReq, BetsHistoryState } from 'types';

export enum BetsHistoryActionTypes {
  GET_DATA = 'BETS_HISTORY.GET_DATA',
  GET_DATA_SUCCESS = 'BETS_HISTORY.GET_DATA_SUCCESS',
}

export type BetsHistoryAction =
 Action<BetsHistoryActionTypes.GET_DATA, GameHistoryReq>
 | Action<BetsHistoryActionTypes.GET_DATA_SUCCESS, BetsHistoryState>;
