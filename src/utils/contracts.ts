import {
  Contract, ethers, providers,
} from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { cardFactoryAbi, cardRandomAbi } from '../abi';

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
