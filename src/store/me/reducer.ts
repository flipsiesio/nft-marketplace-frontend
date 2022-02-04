import type {
  MeState,
} from 'types';
import { LocaleKey } from 'appConstants';
import { MeAction, MeActionTypes } from './actionTypes';

const initialState: MeState = {
  language: LocaleKey.en,
  isEmailConfirm: false,
  isTutorialShown: false,
};

export default (state: MeState = initialState, action: MeAction): MeState => {
  switch (action.type) {
    case MeActionTypes.CONFIRM_EMAIL_SUCCESS: {
      return {
        ...state,
        isEmailConfirm: true,
      };
    }

    case MeActionTypes.TUTORIAL_TOGGLE: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          isTutorialShown: payload as boolean,
        };
      }
      return state;
    }

    case MeActionTypes.SET_LANG: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          language: payload as LocaleKey,
        };
      }
      return state;
    }

    case MeActionTypes.SET_STATE: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          [payload.key]: payload.value,
        };
      }

      return state;
    }

    default:
      return state;
  }
};
