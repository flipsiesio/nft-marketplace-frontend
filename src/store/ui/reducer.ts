import type { UIState } from 'types/store/ui';
import { TronActionTypes } from 'store/tron/actionTypes';
import { MeActionTypes } from 'store/me/actionTypes';
import { RequestStatus } from 'appConstants';
import type { UIAction } from './actions';

const initialState: UIState = {
  [TronActionTypes.CONNECT]: RequestStatus.INIT,
  [TronActionTypes.LOGOUT]: RequestStatus.INIT,

  [MeActionTypes.CONFIRM_EMAIL]: RequestStatus.INIT,
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
