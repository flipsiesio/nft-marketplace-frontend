import { TronState } from 'types';
import { TronStatus } from 'appConstants';
import { TronActionTypes, TronAction } from './actionTypes';

const initialState: TronState = {
  address: '',
  name: '',
  status: TronStatus.NOT_AVAILABLE,
  balance: 0,
  network: null,
};

export default (
  state: TronState = initialState,
  action: TronAction,
): TronState => {
  switch (action.type) {
    case TronActionTypes.CONNECT_SUCCESS: {
      const { payload } = action;
      if (payload) return payload;
      return state;
    }

    case TronActionTypes.LOGOUT_SUCCESS: {
      const { payload } = action;
      if (payload) return payload;
      return state;
    }

    case TronActionTypes.SET_STATE: {
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
