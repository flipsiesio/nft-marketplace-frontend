import type { BetsHistoryState } from 'types';
import { BetsHistoryActionTypes, BetsHistoryAction } from './actionTypes';

const initialState: BetsHistoryState = {
  bets: [],
  count: 0,
};

// eslint-disable-next-line max-len
export default (state: BetsHistoryState = initialState, action: BetsHistoryAction): BetsHistoryState => {
  switch (action.type) {
    case BetsHistoryActionTypes.GET_DATA_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          ...payload,
        };
      }

      return state;
    }

    default:
      return state;
  }
};
