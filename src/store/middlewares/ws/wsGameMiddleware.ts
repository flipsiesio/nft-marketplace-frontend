import { MiddlewareAPI } from 'redux';
import { TypeSocket } from 'typesocket';
import { WSType } from 'appConstants';
import {
  gameSetNewGameAction,
  gameSetErrorAction,
  gameSetClaimAction,
} from 'store/game/actions';
import { WsGameTypes } from 'store/api/actionTypes';
import type { State } from 'types';
import { WS_PINGPONG_MSG, wsPingPong } from './wsPingPong';
import wsSetConnect from './wsSetConnect';
import type {
  WSGameResultMessage,
  WSGameErrorMessage,
  WsGameClaimMessage,
} from './types';

const wsGameMiddleware = () => {
  let socket: TypeSocket<string>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
  return (store: MiddlewareAPI<any, State>) => (next: (action: any) => void) => (action: any) => {
    switch (action.type) {
      case WsGameTypes.WS_CONNECT: {
        socket = wsSetConnect(process.env.REACT_APP_WS_GAME_URL as string);
        wsPingPong(socket);

        socket.on('connected', () => {
          store.dispatch({
            type: WsGameTypes.WS_CONNECTED,
          });
        });

        socket.on('message', (message) => {
          if (message !== WS_PINGPONG_MSG) {
            const { type, message: data } =
              message as unknown as { type: WSType, message: unknown };

            if (type === WSType.RESULT) {
              store.dispatch(gameSetNewGameAction(data as WSGameResultMessage));
            }

            if (type === WSType.ERROR) {
              const { requestId, userAddress, method } = data as unknown as WSGameErrorMessage;
              store.dispatch(gameSetErrorAction({
                requestId,
                userAddress,
                method,
              }));
            }

            if (type === WSType.CLAIMED) {
              const requestId = data as unknown as WsGameClaimMessage;
              store.dispatch(gameSetClaimAction(requestId));
            }
          }
        });
        break;
      }

      case WsGameTypes.WS_DISCONNECT: {
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

export default wsGameMiddleware;
