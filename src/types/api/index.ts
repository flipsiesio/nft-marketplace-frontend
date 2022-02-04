import { AxiosResponse } from 'axios';

export * from './user';
export * from './game';
export * from './trxUsdRate';
export * from './nftMarket';

export interface ApiResponse<T> extends AxiosResponse<T> {}
