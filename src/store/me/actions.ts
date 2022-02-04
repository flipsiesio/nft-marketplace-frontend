import { LocaleKey } from 'appConstants';
import { MeState } from 'types';
import { MeActionTypes } from './actionTypes';

export const meConfirmEmailAction = (payload: string) => ({
  type: MeActionTypes.CONFIRM_EMAIL,
  payload,
});

export const meTutorialToggleAction = (payload: boolean) => ({
  type: MeActionTypes.TUTORIAL_TOGGLE,
  payload,
});

export const meSetLangAction = (payload: LocaleKey) => ({
  type: MeActionTypes.SET_LANG,
  payload,
});

export const meSetStateAction = <K extends keyof MeState>
  (payload: { key: K, value: MeState[K] }) => ({
    type: MeActionTypes.SET_STATE,
    payload,
  });
