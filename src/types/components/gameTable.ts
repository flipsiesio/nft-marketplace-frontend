import type { PlayingCardSuit, PlayingCardRank } from 'types';

export type GameTableCard = {
  rank: PlayingCardRank,
  suit: PlayingCardSuit,
  isInverted?: boolean,
  className?: string,
};

export type GameTableChips = {
  red: number,
  blue: number,
  lightBlue: number,
  violet: number,
  darkRed: number,
};

export type GameTablePlayer = {
  photo?: string,
  name: string,
  cards: GameTableCard[],
  chips?: GameTableChips,
  balance?: number,
  isHighlight?: boolean,
  combination?: string,
};

export type GameTableProps = {
  player?: GameTablePlayer,
  dealer?: GameTablePlayer,
  className?: string,
  cards: GameTableCard[],
  isDeckVisible?: boolean,
  jackpot?: number,
};
