import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  call, CallEffect, put, PutEffect, select, SelectEffect,
} from 'redux-saga/effects';
import { nftMarketSelector } from '../selectors';
import { marketURL } from '../../appConstants';
import { nftMarketSignOutAction } from '../nftMarket/actions';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function* apiSaga(
  requestConfig: AxiosRequestConfig,
): Generator<CallEffect | PutEffect> {
  // eslint-disable-next-line no-useless-catch
  try {
    return yield call<(config: AxiosRequestConfig) => void>(client, requestConfig);
  } catch(err) {
    throw err;
  }
}

const authClient = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL,
  validateStatus: (status) => {
    return (status === 401 || status === 201);
  },
});
export function* authSaga(
  requestConfig: AxiosRequestConfig,
): Generator<CallEffect | PutEffect | SelectEffect> {
  const accessToken = yield select(nftMarketSelector.getProp('accessToken'));

  if (accessToken) {
    authClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }
  // @ts-ignore
  const response:AxiosResponse<unknown> =
      yield call<(config: AxiosRequestConfig) => void>(authClient, requestConfig);

  if (response.status === 401) {
    const refreshToken = yield select(nftMarketSelector.getProp('refreshToken'));
    const signedMsg = yield select(nftMarketSelector.getProp('signedMsg'));

    try {
      yield call(authSaga, {
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

const marketClient = axios.create({
  baseURL: process.env.REACT_APP_MARKET_API_URL,
});

export function* marketApiSaga(requestConfig: AxiosRequestConfig) {
  // eslint-disable-next-line no-useless-catch
  try {
    return yield call<(config: AxiosRequestConfig) => void>(marketClient, requestConfig);
  } catch(err) {
    throw err;
  }
}
