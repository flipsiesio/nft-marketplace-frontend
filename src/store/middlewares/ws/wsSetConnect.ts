import { TypeSocket } from 'typesocket';

function wsSetConnect(url: string) {
  const socket: TypeSocket<string> = new TypeSocket(url, {
    retryOnClose: true,
  });
  socket.connect();
  return socket;
}

export default wsSetConnect;
