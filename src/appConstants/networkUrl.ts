export enum Network {
  mainnet = 'Mainnet',
  shasta = 'Shasta',
}

export const NETWORK_URL: Record<Network, string> = {
  [Network.mainnet]: 'https://api.trongrid.io',
  [Network.shasta]: 'https://api.shasta.trongrid.io',
};
