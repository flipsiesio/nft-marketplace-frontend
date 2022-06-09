/* eslint-disable no-param-reassign */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MiddlewareAPI } from 'redux';
import { marketClient } from '../store/api';
import { NftMarketCheckSignRes, State } from '../types';
import { marketURL } from '../appConstants';
import { nftMarketSetStateAction, nftMarketSignOutAction } from '../store/nftMarket/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refreshTokens = async (store: MiddlewareAPI<any, State>) => {
  const {
    signedMsg,
  } = store.getState().nftMarket;

  const { address } = store.getState().tron;

  const res = await marketClient.post<NftMarketCheckSignRes>(marketURL.AUTH.REFRESH, {
    tronWalletAddress: address,
    signedMsg,
  });

  store.dispatch(nftMarketSetStateAction({
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  }));

  return res.data.accessToken;
};

/**
 * Handles Bearer authorization and token refresh with store
 * @param store
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAPIInterceptors = (store: MiddlewareAPI<any, State>) => {
  // Pass token to axios
  marketClient.interceptors.request.use((options: AxiosRequestConfig): AxiosRequestConfig => {
    const { accessToken } = store.getState().nftMarket;

    if (
      !accessToken ||
      options.url === marketURL.AUTH.REFRESH ||
      options.headers['Authorization']
    ) {
      return options;
    }

    options.headers.Authorization = `Bearer ${accessToken}`;

    return options;
  });

  const onFulfilled = async (res: AxiosResponse) => {
    return res;
  };

  // Refresh on 401
  marketClient.interceptors.response.use(onFulfilled, async (error: AxiosError) => {
    const { refreshToken } = store.getState().nftMarket;

    if (
      error.response?.status === 401 &&
      refreshToken &&
      error.config.url !== marketURL.AUTH.REFRESH
    ) {
      const originalRequest = error.config;

      if (!originalRequest.headers) throw error;

      try {
        // try to refresh token
        originalRequest.headers.access_token = await refreshTokens(store);
        return await marketClient(originalRequest);
      } catch (e) {
        store.dispatch(nftMarketSignOutAction());
        // throw original error
        throw error;
      }
    }

    throw error;
  });
};
