import {Server, type WebSocket as WSWebSocket} from 'ws';
import {type IncomingMessage} from 'http';

export const startWsServer = (): void => {
  const wsServer = new Server({port: 3000});
  wsServer.on('connection', onConnection);
  wsServer.on('error', error => {
    console.log(error);
  });
  console.log(`Start WebSocket server on the ${3000} port!`);
};

const onConnection = (ws: WSWebSocket, req: IncomingMessage): void => {
  console.log(`Client connected with key ${req.headers['sec-websocket-key']}!`);

  ws.on('message', (message: Buffer) => {
    const messageString = JSON.parse(message.toString('utf8'));
    console.log(messageString);
  });

  ws.on('close', () => {
    console.log(`Client disconnected!`);
  });
};
