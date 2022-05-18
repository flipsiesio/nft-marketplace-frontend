export type NftMarketCheckSignRes = {
  refreshToken: string,
  accessToken: string,
};

export enum NftType {
  KING,
  QUEEN,
  JACK,
  RARE, // Jokers or One-of-ones
}

export enum NftSuit {
  HEARTS,
  CLUBS,
  DIAMONDS,
  SPADES,
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

export type NftDto = {
  id: number;
  suit: NftSuit;
  suitRarity: string;
  face: NftType;
  faceRarity: string;
  clothes: string;
  clothesRarity: string;
  background: string;
  backgroundRarity: string;
  hair: string;
  hairRarity: string;
  borderline: string;
  borderlineRarity: string;
  egg: string;
  eggRarity: string;
  teardrop: string;
  teardropRarity: string;
  owner: string;
  listingPrice: string;
  highestPrice: string;
};

export type AcceptBid = {
  payerAddress: string
  nftId: string
};

export type SoldReq = {
  buyerAddress: string,
  nftId: string,
};

export type CardMetadata = {
  face: string
  suit: string
};
