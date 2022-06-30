import { toast } from 'react-toastify';
import { MarketType } from '../types';

export const getMyAddress = () => {
  if (window.tronWeb) {
    return window.tronWeb.defaultAddress?.base58 || window.tronLinkInitialData?.address;
  }
  return '';
};

export function getMyName():string {
  return window.tronWeb.defaultAddress?.name || window.tronLinkInitialData?.name || 'Player';
}

export function checkTronAuth():boolean {
  const address = getMyAddress();
  return Boolean(address);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTronContract = async (address: string): Promise<any> => {
  try {
    const contract = await window.tronWeb.contract().at(address);
    return contract;
  } catch (err) {
    toast.error(err);
    throw err;
  }
};

export const getTrxFromSun = (sun: string) => {
  if (window.tronWeb) {
    return Number(window.tronWeb.fromSun(sun));
  }
  return 0;
};

export const getApproved = async (cardId: number | string, type: MarketType) => {
  const toAproveContractAddress = type === MarketType.Auction
    ? process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
    : process.env.REACT_APP_CONTRACT_NFT_SALE as string;
  const contract = await getTronContract(process.env.REACT_APP_CONTRACT_CARD as string);
  const data: string = await contract.getApproved(cardId).call();
  const dataAddress = window.tronWeb.address.fromHex(data);
  return toAproveContractAddress === dataAddress;
};
