import { ActionFn } from 'types/redux';
import { AdminState } from 'types/store/AdminState';
import { adminSetState, adminSetStatus } from './actionCreators';
import { AdminActionTypes } from './actionsTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminHandlerFn<F extends (...args: any) => any> = ActionFn<AdminState, ReturnType<F>>;

const setState: AdminHandlerFn<typeof adminSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: AdminHandlerFn<typeof adminSetStatus> = (
  state,
  { payload },
) => ({
  ...state,
  ui: {
    ...state.ui,
    [payload.type]: payload.status,
  },
});

export const adminHandlers = {
  [AdminActionTypes.SetState]: setState,
  [AdminActionTypes.SetStatus]: setStatus,
};
