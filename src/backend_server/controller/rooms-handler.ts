import {type IncomingClientMessage} from 'backend_server/shared/models';
import {wsClients} from '../store/ws-clients';
import {rooms} from '../store/rooms';
import {users} from '../store/users';

export const createRoomsHandler = (): void => {
  rooms.getRoom();
  updateRooms();
};

export const addUserToRoomHandler = (
  wsKey: string,
  incomingClientMessage: IncomingClientMessage,
): void => {
  const data = JSON.parse(incomingClientMessage.data);
  const user = users.getUserByCurrentSessionId(wsKey);
  const roomId = data.indexRoom as string;
  const room = rooms.getRoom(roomId);
  if (user == null || room == null || room.roomUsers.find(u => u.index === user.index) != null)
    return;
  rooms.addUserToRoom(roomId, user.name, user.index);
  updateRooms();
};
export const updateRooms = (): void => {
  wsClients.forEach(value => {
    const wsClient = value;
    const roomsList = rooms.getRooms();
    wsClient.send(
      JSON.stringify({
        type: 'update_room',
        data: JSON.stringify(roomsList),
        id: 0,
      }),
    );
  });
};
