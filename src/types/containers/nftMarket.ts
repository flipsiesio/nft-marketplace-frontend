import { NftSuit, NftType } from '../api';

export type FilterData = {
  price: {
    highestPrice: boolean
    highestBid: boolean
  },
  type?: NftType
  suit?: NftSuit
};

export type CardProfileCell = {
  title: string
  value: JSX.Element
};
