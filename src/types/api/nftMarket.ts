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
  sort?: { price: boolean } | { bid: boolean };
  filter?: {
    type?: NftType;
    suit?: NftSuit;
  };
};

export type NftProperty = {
  label: string
  rarity: string
  name: string
};

export type NftDto = {
  cardId: number;
  suit: NftSuit;
  suitRarity: string;
  face: NftType;
  faceRarity: string;
  owner: string;
  listingPrice: string;
  highestPrice: string;
  properties: NftProperty[]
  url: string
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

export type CardMetadata = {
  cardId: number
  face: NftType
  suit: NftSuit
  metadata: {
    traits: Traits,
    faceFrequency: number,
    suitFrequency: number
    url: string,
  }
};
