import {
  Contract, ethers, providers,
} from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { MarketType } from 'types';
import {
  cardFactoryAbi, cardRandomAbi, nftCardAbi, nftMarketplaceAbi, nftSaleAbi, erc20Abi,
} from '../abi';

export const getProvider = async () => {
  const ethProvider = await detectEthereumProvider() as providers.ExternalProvider;
  return new ethers.providers.Web3Provider(ethProvider);
};

export const getCardRandomMinterContract = async () => {
  const provider = await getProvider();
  return new Contract(
    process.env.REACT_APP_CONTRACT_CARD_RANDOM_MINTER as string,
    cardRandomAbi,
    provider.getSigner(),
  );
};

export const getCardFactoryContract = async () => {
  const provider = await getProvider();
  return new Contract(
    process.env.REACT_APP_CONTRACT_CARD_FACTORY as string,
    cardFactoryAbi,
    provider.getSigner(),
  );
};

export const getNftMarketPlaceContract = async () => {
  const provider = await getProvider();
  return new Contract(
    process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string,
    nftMarketplaceAbi,
    provider.getSigner(),
  );
};

export const getNftSaleContract = async () => {
  const provider = await getProvider();
  return new Contract(
    process.env.REACT_APP_CONTRACT_NFT_SALE as string,
    nftSaleAbi,
    provider.getSigner(),
  );
};

export const getCardContract = async () => {
  const provider = await getProvider();
  return new Contract(
    process.env.REACT_APP_CONTRACT_CARD as string,
    nftCardAbi,
    provider.getSigner(),
  );
};

export const getApproved = async (cardId: number | string, type: MarketType) => {
  const toAproveContractAddress = type === MarketType.Auction
    ? process.env.REACT_APP_CONTRACT_NFT_MARKETPLACE as string
    : process.env.REACT_APP_CONTRACT_NFT_SALE as string;
  const contract = await getCardContract();
  const dataAddress: string = await contract.getApproved(cardId);
  return toAproveContractAddress === dataAddress;
};

export const getTokenContract = async (tokenAddress: string) => {
  const provider = await getProvider();
  return new Contract(
    tokenAddress,
    erc20Abi,
    provider.getSigner(),
  );
};
