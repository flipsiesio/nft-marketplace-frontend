import { NftSuit, NftType } from '../api';

export type FilterData = {
  price: 'ASC' | 'DESC',
  type: Set<NftType>
  suit: Set<NftSuit>
};

export type CardProfileCell = {
  title: string
  value: JSX.Element
};
