import {type IncomingClientMessage} from 'backend_server/shared/models';
import {type WebSocket as WSWebSocket} from 'ws';
import {users} from '../store/users';
import {updateRooms} from './rooms-handler';
import {updateWinners} from './winners-handler';

export const regHandler = (ws: WSWebSocket, incomingClientMessage: IncomingClientMessage): void => {
  const data = JSON.parse(incomingClientMessage.data);
  const userName = data.name as string;
  const userPassword = data.password as string;

  try {
    const user = users.getUser(userName, userPassword);
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: user?.name,
          index: user?.index,
          error: false,
          errorText: '',
        }),
        id: 0,
      }),
    );
    updateRooms();
    updateWinners();
  } catch (error) {
    ws.send(
      JSON.stringify({
        type: 'reg',
        data: JSON.stringify({
          name: userName,
          index: '',
          error: true,
          errorText: error instanceof Error ? error.message : 'Unknown error',
        }),
        id: 0,
      }),
    );
  }
};
