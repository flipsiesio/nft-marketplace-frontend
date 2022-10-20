import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { MarketType } from '../types';
import { getNftMarketPlaceContract, getNftSaleContract } from './contracts';

export function fromWeiToNumber(value: ethers.BigNumberish, decimal: number = 18) {
  return parseFloat(ethers.utils.formatUnits(value, decimal));
}

export function roundUpNumber(value: string | number, decimals = 2) {
  const bigNumber = new BigNumber(value);
  return bigNumber.toFixed(decimals, BigNumber.ROUND_UP).replace(/0*$/, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFeeString = (feeInBps: any, maxFee: any, price: BigNumber) => {
  const calcFee = price.multipliedBy(feeInBps.toBigInt()).div(maxFee.toBigInt());
  const amount = price.plus(calcFee);
  return amount.integerValue(BigNumber.ROUND_CEIL).toString();
};

export const getFeeString1 =
  (feeInBps: ethers.BigNumber, maxFee: ethers.BigNumber, price: ethers.BigNumber) => {
    const calcFee = price.mul(feeInBps).div(maxFee);
    const amount = price.add(calcFee);
    return amount.toString();
  };

export const getContractByMarketType = (marketType: MarketType) => {
  return marketType === MarketType.Auction
    ? getNftMarketPlaceContract()
    : getNftSaleContract();
};
