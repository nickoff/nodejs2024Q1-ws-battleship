import {Server, type WebSocket as WSWebSocket} from 'ws';
import {type IncomingMessage} from 'http';
import {wsClients} from '../store/ws-clients';
import {regHandler} from '../controller';
import {type IncomingClientMessage} from '../shared/models';

export const startWsServer = (): void => {
  const wsServer = new Server({port: 3000});
  wsServer.on('connection', onConnection);
  wsServer.on('error', error => {
    console.log(error);
  });
  console.log(`Start WebSocket server on the ${3000} port!`);
};

const onConnection = (ws: WSWebSocket, req: IncomingMessage): void => {
  console.log(`Client with key ${req.headers['sec-websocket-key']} connected!`);

  if (req.headers['sec-websocket-key'] != null) {
    wsClients.set(req.headers['sec-websocket-key'], ws);
  }

  ws.on('message', (message: Buffer) => {
    try {
      const incomingClientMessage: IncomingClientMessage = JSON.parse(message.toString('utf8'));
      incomingClientMessageHandler(ws, incomingClientMessage);
    } catch (error) {
      console.log(error);
    }
  });

  ws.on('close', (): void => {
    if (
      req.headers['sec-websocket-key'] != null &&
      wsClients.has(req.headers['sec-websocket-key'])
    ) {
      wsClients.delete(req.headers['sec-websocket-key']);
    }
    console.log(`Client with key ${req.headers['sec-websocket-key']} disconnected!`);
  });
};

const incomingClientMessageHandler = (
  ws: WSWebSocket,
  incomingClientMessage: IncomingClientMessage,
): void => {
  console.log(incomingClientMessage);

  switch (incomingClientMessage.type) {
    case 'reg': {
      regHandler(ws, incomingClientMessage);
      break;
    }
    default: {
      console.log('Unknown message type!');
    }
  }
};
