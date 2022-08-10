export enum Network {
  BitTorrentMain = 'BitTorrentMain',
  BitTorrentTest = 'BitTorrentTest',
}

export const networkChains: Record<Network, string> = {
  [Network.BitTorrentMain]: '0xc7',
  [Network.BitTorrentTest]: '0x405',
};

type Chain = {
  chainId: string,
  chainName: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number,
  },
  rpcUrls: string[],
  blockExplorerUrls: string[],
};

type Chains = Pick<Record<Network, Chain>,
Network.BitTorrentTest | Network.BitTorrentMain>;

export const chains: Chains = {
  [Network.BitTorrentMain]: {
    chainId: networkChains.BitTorrentMain,
    chainName: 'BitTorrent Chain Mainnet',
    nativeCurrency:
      {
        name: 'BTT',
        symbol: 'BTT',
        decimals: 18,
      },
    rpcUrls: ['https://rpc.bt.io'],
    blockExplorerUrls: ['https://bttcscan.com/'],
  },
  [Network.BitTorrentTest]: {
    chainId: networkChains.BitTorrentTest,
    chainName: 'BitTorrent Chain Donau',
    nativeCurrency: {
      name: 'BTT',
      symbol: 'BTT',
      decimals: 18,
    },
    rpcUrls: ['https://pre-rpc.bt.io/'],
    blockExplorerUrls: ['https://testnet.bttcscan.com/'],
  },
};

export const SCAN_URL = 'https://etherscan.io/tx/';
