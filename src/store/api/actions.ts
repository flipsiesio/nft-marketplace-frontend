import {
  WsGameTypes,
  WsRateTypes,
} from './actionTypes';

export const request = <T = string, P = never>(defaultType: T, payload?: P) => ({
  type: `${defaultType}_REQUEST`,
  payload,
});

export const success = <T = string, P = never>(defaultType: T, payload?: P) => ({
  type: `${defaultType}_SUCCESS`,
  payload,
});

export const error = <T = string, E = never>(defaultType: T, err: E) => ({
  type: `${defaultType}_ERROR`,
  payload: err,
  err,
});

export const reset = <T = string>(defaultType: T) => ({
  type: `${defaultType}_RESET`,
});

export const connectToGameWs = () => ({
  type: WsGameTypes.WS_CONNECT,
});

export const disconnectGameWs = (payload: string) => ({
  type: WsGameTypes.WS_DISCONNECT,
  payload,
});

export const connectRateWs = () => ({
  type: WsRateTypes.WS_CONNECT,
});

export const disconnectRateWs = () => ({
  type: WsRateTypes.WS_DISCONNECT,
});

export default {
  request,
  success,
  error,
  reset,
};
