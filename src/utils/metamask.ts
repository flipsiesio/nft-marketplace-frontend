import detectEthereumProvider from '@metamask/detect-provider';
import { MetamaskRequestMethod } from 'store/wallet/types';
import { networkChains } from '../appConstants';
import { getProvider } from './contracts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Provider = any;

export const getAddress = async () => {
  const provider: Provider = await detectEthereumProvider();
  const addresses: string[] = await provider.request({
    method: MetamaskRequestMethod.eth_accounts,
  });
  return addresses;
};

export const requestAccounts = async () => {
  const provider: Provider = await detectEthereumProvider();
  const addresses: string[] = await provider
    .request({ method: MetamaskRequestMethod.eth_requestAccounts });
  return addresses;
};

export const getMetamaskChainId = async (): Promise<string> => {
  const provider: Provider = await detectEthereumProvider();
  return provider.request({ method: MetamaskRequestMethod.eth_chainId });
};

export const checkValidationNetwork = async (id?: string) => {
  let chainId: string | undefined = id;
  if (!chainId) {
    chainId = await getMetamaskChainId();
  }
  const networkIds = Object.values(networkChains);
  if (!chainId) return false;
  return networkIds.includes(chainId);
};

export const metamaskIsInstalled = async () => {
  const provider: Provider = await detectEthereumProvider();
  return !(!provider || !provider.isMetaMask);
};

export const getBalance = async (address: string) => {
  const provider = await getProvider();
  return provider.getBalance(address);
};
