import { BigNumber } from 'bignumber.js';

export default (rank: string, max: string) => {
  const value = new BigNumber(rank, 10);
  const maxValue = new BigNumber(max, 10);
  const valueInPercent = value.multipliedBy(100);
  return parseInt(valueInPercent.dividedBy(maxValue).toString(10), 10);
};
