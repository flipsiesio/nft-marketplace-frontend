import type {
  GameTableCard,
  PlayingCardRank,
  PlayingCardSuit,
} from 'types';

const isContainSpace = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

const transformRank = (value: number): PlayingCardRank => {
  switch (true) {
    case [0, 13, 26, 39].includes(value): return '2';
    case [1, 14, 27, 40].includes(value): return '3';
    case [2, 15, 28, 41].includes(value): return '4';
    case [3, 16, 29, 42].includes(value): return '5';
    case [4, 17, 30, 43].includes(value): return '6';
    case [5, 18, 31, 44].includes(value): return '7';
    case [6, 19, 32, 45].includes(value): return '8';
    case [7, 20, 33, 46].includes(value): return '9';
    case [8, 21, 34, 47].includes(value): return '10';
    case [9, 22, 35, 48].includes(value): return 'J';
    case [10, 23, 36, 49].includes(value): return 'Q';
    case [11, 24, 37, 50].includes(value): return 'K';
    case [12, 25, 38, 51].includes(value): return 'A';

    default:
      return '2';
  }
};

const transformSuit = (value: number): PlayingCardSuit => {
  switch (true) {
    case isContainSpace(value, 0, 12): return 'D';
    case isContainSpace(value, 13, 25): return 'S';
    case isContainSpace(value, 26, 38): return 'H';
    case isContainSpace(value, 39, 51): return 'C';
    default: return 'D';
  }
};

export default (cards: Array<number>): Array<GameTableCard> => {
  return cards.map((card) => ({
    rank: transformRank(card),
    suit: transformSuit(card),
  }));
};
