import type {
  Action,
  GameStateBet,
  Game,
  GameState,
} from 'types';
import type {
  WSGameResultMessage,
  WSGameErrorMessage,
} from 'store/middlewares/ws/types';

export enum GameActionTypes {
  SET_STATE = 'GAME.SET_STATE',
  GET_MAXBET = 'GAME.GET_MAXBET',
  GET_MAXBET_SUCCESS = 'GAME.GET_MAXBET_SUCCESS',

  GET_LAST_GAME = 'GAME.GET_LAST_GAME',
  GET_LAST_GAME_SUCCESS = 'GAME.GET_LAST_GAME_SUCCESS',

  START = 'GAME.START',
  START_SUCCESS = 'GAME.START_SUCCESS',

  SET_RESULT = 'GAME.SET_RESULT',

  SET_ERROR = 'GAME.SET_ERROR',

  SET_NEW_GAME = 'GAME.SET_NEW_GAME',

  GET_PREVIOUS = 'GAME.GET_PREVIOUS',
  GET_PREVIOUS_SUCCESS = 'GAME.GET_PREVIOUS_SUCCESS',

  CLAIM = 'GAME.CLAIM',

  SET_CLAIM = 'GAME.SET_CLAIM',
}

export type GameActionType =
 Action<GameActionTypes.GET_MAXBET>
 | Action<GameActionTypes.GET_MAXBET_SUCCESS, number>

 | Action<GameActionTypes.GET_LAST_GAME>
 | Action<GameActionTypes.GET_LAST_GAME_SUCCESS, Game>

 | Action<GameActionTypes.START, GameStateBet>
 | Action<GameActionTypes.START_SUCCESS, GameStateBet>

 | Action<GameActionTypes.SET_RESULT, Game>

 | Action<GameActionTypes.SET_NEW_GAME, WSGameResultMessage>

 | Action<GameActionTypes.GET_PREVIOUS>
 | Action<GameActionTypes.GET_PREVIOUS_SUCCESS, Game[]>
 | Action<GameActionTypes.SET_ERROR, WSGameErrorMessage>
 | Action<GameActionTypes.CLAIM, string>
 | Action<GameActionTypes.SET_STATE, Partial<GameState>>;
