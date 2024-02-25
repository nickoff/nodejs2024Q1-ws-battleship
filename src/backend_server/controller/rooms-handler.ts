import {type IncomingClientMessage} from 'backend_server/shared/models';
import {type WebSocket as WSWebSocket} from 'ws';
import {wsClients} from '../store/ws-clients';
import {rooms} from '../store/rooms';

export const roomsHandler = (
  ws: WSWebSocket,
  incomingClientMessage: IncomingClientMessage,
): void => {
  console.log(incomingClientMessage);
  ws.send(
    JSON.stringify({
      type: 'create_game',
      data: '',
      id: 0,
    }),
  );
};

export const updateRooms = (): void => {
  wsClients.forEach(value => {
    const wsClient = value;
    wsClient.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify(rooms),
        id: 0,
      }),
    );
  });
};
