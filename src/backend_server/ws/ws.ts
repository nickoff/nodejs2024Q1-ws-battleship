import {Server, type WebSocket as WSWebSocket} from 'ws';
import {type IncomingMessage} from 'http';
import {wsClients} from '../store/ws-clients';
import {regHandler, createRoomsHandler, addUserToRoomHandler, addShipsHandler} from '../controller';
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
  const wsKey = req.headers['sec-websocket-key'];
  console.log(`Client with key ${wsKey} connected!`);

  if (wsKey != null) {
    wsClients.set(wsKey, ws);
  }

  ws.on('message', (message: Buffer) => {
    try {
      if (wsKey == null) return;
      const incomingClientMessage: IncomingClientMessage = JSON.parse(message.toString('utf8'));
      incomingClientMessageHandler(ws, wsKey, incomingClientMessage);
    } catch (error) {
      console.log(error);
    }
  });

  ws.on('close', (): void => {
    if (wsKey != null && wsClients.has(wsKey)) {
      wsClients.delete(wsKey);
    }
    console.log(`Client with key ${wsKey} disconnected!`);
  });
};

const incomingClientMessageHandler = (
  ws: WSWebSocket,
  wsKey: string,
  incomingClientMessage: IncomingClientMessage,
): void => {
  console.log(incomingClientMessage);

  switch (incomingClientMessage.type) {
    case 'reg': {
      regHandler(ws, incomingClientMessage, wsKey);
      break;
    }
    case 'create_room': {
      createRoomsHandler();
      break;
    }
    case 'add_user_to_room': {
      addUserToRoomHandler(wsKey, incomingClientMessage);
      break;
    }
    case 'add_ships': {
      addShipsHandler(incomingClientMessage);
      break;
    }
    default: {
      console.log('Unknown message type!');
    }
  }
};
