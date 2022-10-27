import createReducer from 'utils/createReducer';
import { RequestStatus } from 'types';
import { AdminState } from 'types/store/AdminState';
import { AdminActionTypes } from './actionsTypes';
import { adminHandlers } from './handlers';

export const adminInitialState: Readonly<AdminState> = {
  ui: {
    [AdminActionTypes.GetData]: RequestStatus.INIT,
  },
};

export default createReducer(adminInitialState, adminHandlers);
