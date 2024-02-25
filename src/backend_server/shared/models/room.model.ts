export interface RoomModel {
  roomId: string | number;
  roomUsers: RoomUser[];
}

export interface RoomUser {
  name: string;
  index: string | number;
}
