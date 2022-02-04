import type { GameHistoryReq } from 'types';
import { BetsHistoryActionTypes } from './actionTypes';

export const betsHistoryGetDataAction = (payload: GameHistoryReq) => ({
  type: BetsHistoryActionTypes.GET_DATA,
  payload,
});
