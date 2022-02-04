import { MiddlewareAPI } from 'redux';
import { TypeSocket } from 'typesocket';
import { WSType } from 'appConstants';
import { WsRateTypes } from 'store/api/actionTypes';
import { updateTrxUsdRate } from 'store/trxUsdRate/actions';
import { WS_PINGPONG_MSG, wsPingPong } from './wsPingPong';
import wsSetConnect from './wsSetConnect';
import type { WsRateMessage } from './types';

const wsRateMiddleware = () => {
  let socket: TypeSocket<string>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
  return (store: MiddlewareAPI<any, any>) => (next: (action: any) => void) => (action: any) => {
    switch (action.type) {
      case WsRateTypes.WS_CONNECT: {
        socket = wsSetConnect(process.env.REACT_APP_WS_RATE_URL as string);
        wsPingPong(socket);

        socket.on('connected', () => {
          store.dispatch({
            type: WsRateTypes.WS_CONNECTED,
          });
        });

        socket.on('message', (message) => {
          if (message !== WS_PINGPONG_MSG) {
            const { message: data } =
              message as unknown as { type: WSType, message: unknown };

            store.dispatch(updateTrxUsdRate({
              rate: data as WsRateMessage,
            }));
          }
        });
        break;
      }

      case WsRateTypes.WS_DISCONNECT: {
        if (socket) {
          socket.disconnect();
        }
        break;
      }

      default:
        return next(action);
    }
  };
};

export default wsRateMiddleware;
