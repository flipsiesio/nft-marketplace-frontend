import type { UIState } from 'types/store/ui';
import { TronActionTypes } from 'store/tron/actionTypes';
import { ReferralActionTypes } from 'store/referral/actionTypes';
import { BetsHistoryActionTypes } from 'store/betsHistory/actionTypes';
import { JackpotActionTypes } from 'store/jackpot/actionTypes';
import { GameActionTypes } from 'store/game/actionTypes';
import { MeActionTypes } from 'store/me/actionTypes';
import { RequestStatus } from 'appConstants';
import type { UIAction } from './actions';

const initialState: UIState = {
  [TronActionTypes.CONNECT]: RequestStatus.INIT,
  [TronActionTypes.LOGOUT]: RequestStatus.INIT,

  [ReferralActionTypes.CREATE_LINK]: RequestStatus.INIT,
  [ReferralActionTypes.GET_LINK]: RequestStatus.INIT,
  [ReferralActionTypes.GET_STATS]: RequestStatus.INIT,
  [ReferralActionTypes.JOIN_BY]: RequestStatus.INIT,
  [ReferralActionTypes.WITHDRAW]: RequestStatus.INIT,

  [BetsHistoryActionTypes.GET_DATA]: RequestStatus.INIT,

  [JackpotActionTypes.GET_VALUE]: RequestStatus.INIT,
  [JackpotActionTypes.GET_DATA]: RequestStatus.INIT,

  [MeActionTypes.CONFIRM_EMAIL]: RequestStatus.INIT,

  [GameActionTypes.START]: RequestStatus.INIT,
  [GameActionTypes.GET_MAXBET]: RequestStatus.INIT,
  [GameActionTypes.GET_LAST_GAME]: RequestStatus.INIT,

  [GameActionTypes.CLAIM]: RequestStatus.INIT,
};

export default (state: UIState = initialState, action: UIAction): UIState => {
  const { type } = action;

  if (type === 'RESET_UI') return initialState;

  const matches = /(.*)_(REQUEST|SUCCESS|ERROR|RESET)/.exec(type) as unknown as [undefined, string, RequestStatus];

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState === RequestStatus.RESET ? RequestStatus.INIT : requestState,
  };
};
