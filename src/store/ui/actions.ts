import type { Action } from 'types';

type ActionTypes = 'RESET_UI' | string;

export type UIAction = Action<ActionTypes>;

export const resetUI = (): UIAction => ({
  type: 'RESET_UI',
});
