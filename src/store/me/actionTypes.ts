import type {
  Action,
  MeState,
} from 'types';
import { LocaleKey } from 'appConstants';

export enum MeActionTypes {
  SET_STATE = 'ME.SET_STATE',
  TUTORIAL_TOGGLE = 'ME.TUTORIAL_TOGGLE',

  CONFIRM_EMAIL = 'ME.CONFIRM_EMAIL',
  CONFIRM_EMAIL_SUCCESS = 'ME.CONFIRM_EMAIL_SUCCESS',

  PERSIST = 'persist/REHYDRATE',

  SET_LANG = 'ME.SET_LANG',
}

export type MeAction =
  Action<MeActionTypes.TUTORIAL_TOGGLE, boolean>
  | Action<MeActionTypes.CONFIRM_EMAIL, string>
  | Action<MeActionTypes.CONFIRM_EMAIL_SUCCESS>
  | Action<MeActionTypes.SET_LANG, LocaleKey>
  | Action<MeActionTypes.PERSIST>
  | Action<MeActionTypes.SET_STATE, { key: keyof MeState, value: unknown}>;
