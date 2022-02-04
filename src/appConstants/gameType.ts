import { GameSelectedColor, GameType } from './enums';

export const GAME_TYPE: Record<number, GameType> = {
  0: GameType.LOST,
  1: GameType.DRAW,
  2: GameType.WIN,
  3: GameType.JACKPOT,
};

export const SELECTED_COLORS: Record<number, GameSelectedColor> = {
  0: GameSelectedColor.RED,
  1: GameSelectedColor.BLACK,
};
