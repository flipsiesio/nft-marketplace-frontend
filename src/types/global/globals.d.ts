type PokerContract = {};

interface Window {
  tronWeb: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request: (obj: any) => Promise<void>
    fullNode: {
      host: string,
    },
    defaultAddress?: {
      base58: string,
      name: string,
    },
    utils: {
      code: {
        hexStr2byteArray: (msg: string) => string[]
      }
    }
    sha3: (msg: string[]) => string
    contract: () => {
      at: (value: string) => Promise<void>,
    },
    toHex: (value: string) => string,
    toDecimal: (value: number) => number,
    fromSun: (value: string | number) => string,
    toSun: (value: number) => string,
    toBigNumber: (value: string | number) => BigInt,
    address: {
      fromHex: (value: string) => string,
      toHex: (value: string) => string,
    },
    trx: {
      getBalance: (address: string) => Promise<number>,
      sign: (value: string) => Promise<string>,
    },
    getEventResult: (
      address: string,
      options: {
        eventName: string,
        size: number,
        onlyConfirmed: true,
      },
      callback?: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<any[]>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BigNumber: any
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Hand: any,
  tronLinkInitialData: {
    address: string,
    name: string,
  },
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
