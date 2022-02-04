import { GameSelectedColor } from 'appConstants';
import { Game } from 'types';

export type GameStateBet = {
  selectedColor: GameSelectedColor,
  flip: number,
  color: number,
};

export type GameState = {
  bet: GameStateBet,
  result: Game,
  lastGame: Game,
  maxBet: number,
  previousGames: Game[],
  claimLoading: string[],
};
