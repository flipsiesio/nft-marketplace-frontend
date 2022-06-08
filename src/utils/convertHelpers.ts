import BigNumber from 'bignumber.js';

export function getAmountSum(term1: string, term2: string) {
  const term1Trx = Number(window.tronWeb.fromSun(term1));
  const term2Trx = Number(window.tronWeb.fromSun(term2));

  return term1Trx + term2Trx;
}

export function fromSunToNumber(value: string) {
  return Number(window.tronWeb.fromSun(value));
}

export function roundUpNumber(value: string | number, decimals = 2) {
  const bigNumber = new BigNumber(value);
  return bigNumber.toFixed(decimals, BigNumber.ROUND_UP).replace(/0*$/, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFeeString = async (feeInBps: any, maxFee: any, price: BigNumber) => {
  const calcFee = price.multipliedBy(feeInBps.toBigInt()).div(maxFee.toBigInt());
  const amount = price.plus(calcFee);
  return amount.integerValue(BigNumber.ROUND_CEIL).toString();
};
