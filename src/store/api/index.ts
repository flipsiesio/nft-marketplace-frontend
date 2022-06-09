import axios, { AxiosRequestConfig } from 'axios';
import {
  call, CallEffect, PutEffect, SelectEffect,
} from 'redux-saga/effects';

export const marketClient = axios.create({
  baseURL: process.env.REACT_APP_MARKET_API_URL,
});

export function* marketApiSaga(
  requestConfig: AxiosRequestConfig,
): Generator<CallEffect | PutEffect | SelectEffect> {
  // @ts-ignore
  return yield call<(config: AxiosRequestConfig) => void>(marketClient, requestConfig);
}
