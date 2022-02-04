import type { JackpotState } from 'types';
import { JackpotActionTypes, JackpotAction } from './actionTypes';

const initialState: JackpotState = {
  data: [],
  value: 0,
};

// eslint-disable-next-line max-len
export default (state: JackpotState = initialState, action: JackpotAction): JackpotState => {
  switch (action.type) {
    case JackpotActionTypes.GET_DATA_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          data: payload,
        };
      }

      return state;
    }

    case JackpotActionTypes.GET_VALUE_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          value: payload,
        };
      }

      return state;
    }

    default:
      return state;
  }
};
