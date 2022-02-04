import { BigNumber } from 'bignumber.js';

export const fromByteToCardsArr = (byteValue: string): number[] => {
  const byteArrNumber = new BigNumber(byteValue.toString(), 10);
  const byteArr = byteArrNumber.toString(2).split('');
  const arr = [];

  for (let i = 0; i < 8; i++) {
    const value = byteArr.splice(byteArr.length - 6, 6).join('');
    arr.push(parseInt(value, 2));
  }

  arr.push(parseInt(byteArr.join(''), 2));
  return arr;
};
