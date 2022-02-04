export type NftMarketCheckSignRes = {
  refreshToken: string,
  accessToken: string,
};

export enum NftType {
  King,
  Queen,
  Jack,
  Rare, // Jokers or One-of-ones
}

export enum NftSuit {
  Hearts,
  Clubs,
  Diamonds,
  Spades,
}

export type NftReqDto = {
  limit: number;
  skip: number;
  sort: { price: boolean } | { bid: boolean };
  filter: {
    type?: NftType;
    suit?: NftSuit;
  };
};

export type NftRes = {
  cardId: number
};

export type NftDto = {
  id: number;
  type: string;
  suit: NftSuit;
  attribute: string;
  owner: string;
  listingPrice: number;
  highestPrice: number;
  bgColor?: string;
  cardColor?: string;
};

export type AcceptBid = {
  payerAddress: string
  nftId: string
};

export type SoldReq = {
  buyerAddress: string,
  nftId: string,
};
