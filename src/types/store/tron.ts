import { TronStatus, Network } from 'appConstants';

export type TronState = {
  address: string,
  name: string,
  status: TronStatus,
  balance: number,
  network: Network | null,
};
