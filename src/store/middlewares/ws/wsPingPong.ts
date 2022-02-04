/* eslint-disable no-await-in-loop,no-continue */
import { TypeSocket } from 'typesocket';
import { sleepForMs } from 'utils';

export const WS_PINGPONG_MS = 5000;
export const WS_PINGPONG_MSG = 'PING';

/**
 * The function of sending messages to the websocket server to maintain the connection
 * @param socket - instance of TypeSocket library
 */
export function wsPingPong(socket: TypeSocket<string>) {
  (async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (socket.readyState) {
        socket.send(WS_PINGPONG_MSG);
      }
      await sleepForMs(WS_PINGPONG_MS);
    }
  })();
}

export default wsPingPong;
