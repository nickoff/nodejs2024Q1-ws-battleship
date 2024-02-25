import {type RoomModel} from '../shared/models/room.model';

export class Rooms {
  private rooms: RoomModel[] = [];

  public getRooms = (): RoomModel[] => {
    return this.rooms;
  };

  public getRoom = (roomId?: string): RoomModel | undefined => {
    if (this.rooms.find(room => room.roomId === roomId) != null) {
      return this.rooms.find(room => room.roomId === roomId);
    }
    const newRoomId = new Date().getTime().toString();
    this.rooms.push({
      roomId: newRoomId,
      roomUsers: [],
    });
    return this.rooms.find(room => room.roomId === newRoomId);
  };

  public deleteRoom = (roomId: string): void => {
    if (this.rooms.find(room => room.roomId === roomId) != null) {
      this.rooms = this.rooms.filter(room => room.roomId !== roomId);
    }
  };

  public addUserToRoom = (
    roomId: string | number,
    userName: string,
    userIndex: string,
  ): RoomModel | null => {
    const room = this.rooms.find(item => item.roomId === roomId);
    if (room != null && room.roomUsers.length < 2) {
      room.roomUsers.push({name: userName, index: userIndex});
      return room;
    }
    return null;
  };

  public removeUserFromRoom = (roomId: string, userIndex: string): void => {
    const room = this.rooms.find(item => item.roomId === roomId);
    if (room != null) {
      room.roomUsers = room.roomUsers.filter(user => user.index !== userIndex);
    }
  };
}

export const rooms = new Rooms();
