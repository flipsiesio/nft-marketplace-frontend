import { AxiosResponse } from 'axios';

export * from './nftMarket';

export interface ApiResponse<T> extends AxiosResponse<T> {}
