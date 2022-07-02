import { BidCardState } from '../types';
import { fromSunToNumber } from './convertHelpers';

export const getBidPrice = (state?: BidCardState | null) => {
  if (state && state.bids) {
    const prices = Object
      .values(state.bids)
      .map((v) => v.price)
      .sort((a, b) => b - a);

    const price = prices[0];
    return `${fromSunToNumber(price ? `${price}` : '0')}`;
  }
  return '0';
};

export const getMyBidPrice = (address: string, state?: BidCardState | null) => {
  if (state && state.bids) {
    const prices = Object
      .values(state.bids)
      .filter((b) => b.buyer === address)
      .map((b) => b.price)
      .sort((a, b) => b - a);

    const price = prices[0];
    return `${fromSunToNumber(price ? `${price}` : '0')}`;
  }
  return '0';
};
