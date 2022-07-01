export type NftMarketCheckSignRes = {
  refreshToken: string,
  accessToken: string,
};

export enum NftType {
  KING= 'King',
  QUEEN = 'Queen',
  JACK = 'Jack',
  JOKER = 'Joker', // Jokers or One-of-ones
}

export enum NftSuit {
  HEARTS= 'Hearts',
  CLUBS = 'Clubs',
  DIAMONDS = 'Diamonds',
  SPADES = 'Spades',
  RED = 'Red',
  BLACK = 'Black',
}

export type NftReqDto = {
  limit: number;
  skip: number;
  order?: 'ASC' | 'DESC';
  faces?: NftType[];
  suits?: NftSuit[];
  inWalletListed?: 'All'| 'Wallet' | 'Listed'
  cardsId?: string[]
  active?: boolean
};

export type NftProperty = {
  label: string
  rarity: string
  name: string
};

export type NftDto = {
  active?: boolean
  cardId: number;
  orderId?: number
  suit: NftSuit;
  suitRarity: string;
  face: NftType;
  faceRarity: string;
  owner?: string;
  properties: NftProperty[]
  url: string
  bidPrice: string
  salePrice: string
  expirationTime?: number
};

export type AcceptBid = {
  payerAddress: string
  nftId: string
};

export type SoldReq = {
  buyerAddress: string,
  nftId: string,
};

type Traits = {
  [key: string]: {
    frequency: number,
    rarity: number,
    main: {
      name: string
      color: {
        color: string
        name: string
      }
    }
  }
};

export interface CardState {
  active: boolean
  id: number
  orderIndex: number
  seller: string
  tokenId: number
  expirationTime: number
}

export interface SaleCardState extends CardState {
  price: string
}

export interface BidCardState extends CardState {
  bids: {
    [key: string]: {
      buyer: string
      price: number
      transaction: string
    }
  }
}

export type CardDataForList = {
  cardId: number
  face: NftType
  suit: NftSuit
  url: string
  state_sale?: SaleCardState | null
  state_bids?: BidCardState | null
};

export type CardData = {
  cardId: number
  face: NftType
  suit: NftSuit
  url: string
  traits: Traits,
  faceFrequency: number,
  suitFrequency: number,
  state_sale?: SaleCardState | null
  state_bids?: BidCardState | null
};

export enum MarketType {
  Auction = 'Auction',
  Sale = 'Sale'
}

export type HistoryData = {
  price: number | null
  amount: number | null
  block: number
  buyer: string
  contract: string
  createdAt: string
  expirationTime: number | null
  id: number
  name: string
  orderIndex: number
  seller: string | null
  timestamp: string
  tokenId: number
  transaction: string
  updatedAt: string
};

export type Jackpot = {
  requestId: string,
  userAddress: string,
  status: number,
  viewed: boolean,
  tokenId: number,
  mintTimestamp: number,
  amount: number
};

export type JackpotIssue = {
  count: number,
  jackpots: Jackpot[]
};
