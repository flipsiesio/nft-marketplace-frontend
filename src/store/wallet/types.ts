import { Network } from 'appConstants';

export enum WalletStatus {
  INIT = 'INIT',
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  CONNECTED = 'CONNECTED',
  LOST = 'LOST',
  NOT_SUPPORT = 'NOT_SUPPORT',
  LOADING = 'LOADING',
}

export enum MetamaskRequestMethod {
  eth_requestAccounts = 'eth_requestAccounts',
  eth_accounts = 'eth_accounts',
  eth_chainId = 'eth_chainId',
  wallet_switchEthereumChain = 'wallet_switchEthereumChain',
  wallet_addEthereumChain = 'wallet_addEthereumChain',
}

export enum Web3Event {
  disconnect = 'disconnect',
  connect = 'connect',
  accountsChanged = 'accountsChanged',
  chainChanged = 'chainChanged',
}

export type WalletState = {
  address: string,
  status: WalletStatus,
  balance: number,
  network: Network | null,
  isLostWallet?: boolean,
};

export type MetamaskProvider = {
  isMetaMask: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (obj: any) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (ev: string, cb: (data: any) => void) => void
  selectedAddress: string,
};
