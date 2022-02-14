export enum Network {
  mainnet = 'Mainnet',
  shasta = 'Nile',
}

export const NETWORK_URL: Record<Network, string> = {
  [Network.mainnet]: 'https://api.trongrid.io',
  [Network.shasta]: 'https://nile.trongrid.io',
};
