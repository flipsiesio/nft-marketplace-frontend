export enum Network {
  mainnet = 'Mainnet',
  nile = 'Nile',
}

export const NETWORK_URL: Record<Network, string> = {
  [Network.mainnet]: 'https://api.trongrid.io',
  [Network.nile]: 'https://api.nileex.io',
};

export const TRONSCAN_URL = 'https://nile.tronscan.org/#/transaction/';
