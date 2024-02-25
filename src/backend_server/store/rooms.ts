import {type RoomModel} from '../shared/models/room.model';

export class Rooms {
  private readonly rooms: RoomModel[] = [];

  public getRoom = (roomId?: string): RoomModel | undefined => {
    if (this.rooms.find(room => room.roomId === roomId) != null) {
      return this.rooms.find(room => room.roomId === roomId);
    }
    this.rooms.push({
      roomId: roomId ?? new Date().getTime().toString(),
      roomUsers: [],
    });
    return this.rooms.find(room => room.roomId === roomId);
  };

  public addUserToRoom = (
    roomId: string,
    userName: string,
    userIndex: string,
  ): RoomModel | null => {
    const room = this.rooms.find(item => item.roomId === roomId);
    if (room != null) {
      room.roomUsers.push({name: userName, index: userIndex});
      return room;
    }
    return null;
  };
}

export const rooms = new Rooms();
