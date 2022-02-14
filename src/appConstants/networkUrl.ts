export enum Network {
  mainnet = 'Mainnet',
  shasta = 'Nile',
}

export const NETWORK_URL: Record<Network, string> = {
  [Network.mainnet]: 'https://api.trongrid.io',
  [Network.shasta]: 'https://nile.trongrid.io',
};

export const TRONSCAN_URL = 'https://nile.tronscan.org/#/transaction/';
