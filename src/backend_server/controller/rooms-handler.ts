import {type IncomingClientMessage, type RoomUser} from '../shared/models';
import {wsClients} from '../store/ws-clients';
import {rooms} from '../store/rooms';
import {users} from '../store/users';
import {getResponseMessage} from '../shared/utils/response-message';

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
  if (room.roomUsers.length === 2) {
    createGame(room.roomUsers);
    rooms.deleteRoom(roomId);
    updateRooms();
  }
};
export const updateRooms = (): void => {
  wsClients.forEach(value => {
    const wsClient = value;
    const roomsList = rooms.getRooms();
    const responseData = JSON.stringify(roomsList);
    wsClient.send(getResponseMessage('update_room', responseData));
  });
};

export const createGame = (roomUserList: RoomUser[]): void => {
  const roomUsers = users.getUsers().filter(user => roomUserList.find(u => u.index === user.index));
  const idGame = new Date().getTime().toString();
  wsClients.forEach((value, key) => {
    if (key == null || roomUsers.find(u => u.currentSessionId === key) == null) return;
    const wsClient = value;
    const roomUser = roomUsers.find(u => u.currentSessionId === key);
    const responseData = JSON.stringify({
      idGame,
      idPlayer: roomUser?.index,
    });
    wsClient.send(getResponseMessage('create_game', responseData));
  });
};
