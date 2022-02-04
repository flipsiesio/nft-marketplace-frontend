import { ReferralState } from 'types';
import { ReferralActionTypes, ReferralAction } from './actionTypes';

const initialState: ReferralState = {
  link: '',
  totalEarnings: '0',
  invitedPlayers: 0,
  rank: '0',
  rankName: '',
  rankMaxValue: '0',
  bonus: '0',
};

export default (
  state: ReferralState = initialState,
  action: ReferralAction,
): ReferralState => {
  switch (action.type) {
    case ReferralActionTypes.CREATE_LINK_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          link: payload,
        };
      }

      return state;
    }

    case ReferralActionTypes.GET_LINK_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          link: payload,
        };
      }

      return state;
    }

    case ReferralActionTypes.GET_STATS_SUCCESS: {
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
