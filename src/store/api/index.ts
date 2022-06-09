import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  call, CallEffect, put, PutEffect, select, SelectEffect,
} from 'redux-saga/effects';
import { nftMarketSelector } from '../selectors';
import { marketURL } from '../../appConstants';
import { nftMarketSignOutAction } from '../nftMarket/actions';

const marketClient = axios.create({
  baseURL: process.env.REACT_APP_MARKET_API_URL,
});

export function* marketApiSaga(
  requestConfig: AxiosRequestConfig,
): Generator<CallEffect | PutEffect | SelectEffect> {
  const accessToken = yield select(nftMarketSelector.getProp('accessToken'));

  if (accessToken) {
    marketClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }
  // @ts-ignore
  const response:AxiosResponse<unknown> =
    yield call<(config: AxiosRequestConfig) => void>(marketClient, requestConfig);

  if (response.status === 401) {
    const refreshToken = yield select(nftMarketSelector.getProp('refreshToken'));
    const signedMsg = yield select(nftMarketSelector.getProp('signedMsg'));

    try {
      yield call(marketApiSaga, {
        method: 'post',
        url: marketURL.AUTH.REFRESH,
        headers: {
          Authorization: '',
        },
        data: {
          tronWalletAddress: refreshToken,
          signedMsg,
        },
      });
    } catch (err) {
      yield put(nftMarketSignOutAction());
      throw new Error(err);
    }
  }

  return response;
}
