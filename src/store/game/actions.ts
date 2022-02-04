import type {
  GameStateBet,
  Game,
  GameState,
} from 'types';
import { WSGameResultMessage, WSGameErrorMessage, WsGameClaimMessage } from 'store/middlewares/ws/types';
import { GameActionTypes } from './actionTypes';

export const gameSetStateAction = (payload: Partial<GameState>) => ({
  type: GameActionTypes.SET_STATE,
  payload,
});

export const gameGetMaxbetAction = () => ({
  type: GameActionTypes.GET_MAXBET,
});

export const gameGetLastAction = () => ({
  type: GameActionTypes.GET_LAST_GAME,
});

export const gameStartAction = (payload: GameStateBet) => ({
  type: GameActionTypes.START,
  payload,
});

export const gameSetNewGameAction = (payload: WSGameResultMessage) => ({
  type: GameActionTypes.SET_NEW_GAME,
  payload,
});

export const gameSetResultAction = (payload: Game) => ({
  type: GameActionTypes.SET_RESULT,
  payload,
});

export const gameGetPreviousAction = () => ({
  type: GameActionTypes.GET_PREVIOUS,
});

export const gameSetErrorAction = (payload: WSGameErrorMessage) => ({
  type: GameActionTypes.SET_ERROR,
  payload,
});

export const gameClaimAction = (payload: string) => ({
  type: GameActionTypes.CLAIM,
  payload,
});

export const gameSetClaimAction = (payload: WsGameClaimMessage) => ({
  type: GameActionTypes.SET_CLAIM,
  payload,
});
