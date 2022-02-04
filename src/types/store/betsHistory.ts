export type Game = {
  bet: string,
  betColor: string,
  cards: number[],
  isColorWin: null | boolean,
  randomOrgData: {
    signature: string,
    random: Object,
  } | null,
  requestId: string,
  result: number,
  selectedColor: number,
  timestamp: string,
  txFinish: string,
  userAddress: string,
  winColorAmount: string,
  winPokerAmount: string,
  isClaimed: boolean | null,
  createdAt: string,
};

export type BetsHistoryState = {
  bets: Game[];
  count: number;
};
