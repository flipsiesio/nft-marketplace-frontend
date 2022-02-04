import type { Game } from 'types';

export type GameHistoryRes = {
  games: Game[];
  gamesCount: number,
};

export type GameHistoryReq = {
  limit: number;
  offset: number;
  order?: string;
  sortBy?: string;
  address?: string;
  type?: number;
};
