import { Game } from 'types';

export type WSGameResultMessage = Game;

export type WSGameErrorMessage = {
  requestId: string,
  userAddress: string,
  method?: string,
};

export type WsGameClaimMessage = {
  userAddress: string,
  requestId: string,
};

export type WsRateMessage = number;
