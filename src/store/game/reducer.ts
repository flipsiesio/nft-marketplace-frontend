import type { GameState, Game } from 'types';
import { GameSelectedColor } from 'appConstants';
import { GameActionTypes, GameActionType } from './actionTypes';

export const initialBet: Game = {
  bet: '',
  betColor: '',
  cards: [],
  isColorWin: null,
  randomOrgData: null,
  requestId: '',
  result: 0,
  selectedColor: 0,
  timestamp: '',
  txFinish: '',
  userAddress: '',
  winColorAmount: '',
  winPokerAmount: '',
  isClaimed: false,
  createdAt: '',
};

const initialState: GameState = {
  result: initialBet,
  bet: {
    selectedColor: GameSelectedColor.RED,
    flip: 0,
    color: 0,
  },
  maxBet: 0,
  lastGame: initialBet,
  previousGames: [],
  claimLoading: [],
};

export default (state: GameState = initialState, action: GameActionType): GameState => {
  switch(action.type) {
    case GameActionTypes.GET_MAXBET_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          maxBet: payload,
        };
      }

      return state;
    }

    case GameActionTypes.GET_LAST_GAME_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          lastGame: payload,
        };
      }

      return state;
    }

    case GameActionTypes.START_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          bet: payload,
        };
      }
      return state;
    }

    case GameActionTypes.SET_RESULT: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          result: payload,
        };
      }

      return state;
    }

    case GameActionTypes.SET_ERROR: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          result: initialBet,
        };
      }

      return state;
    }

    case GameActionTypes.GET_PREVIOUS_SUCCESS: {
      const { payload } = action;
      if (payload) {
        return {
          ...state,
          previousGames: payload,
        };
      }

      return state;
    }

    case GameActionTypes.SET_STATE: {
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
