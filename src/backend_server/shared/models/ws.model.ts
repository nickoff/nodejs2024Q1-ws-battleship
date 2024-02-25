export interface IncomingClientMessage {
  type:
    | 'reg'
    | 'create_room'
    | 'add_user_to_room'
    | 'create_game'
    | 'start_game'
    | 'turn'
    | 'attack'
    | 'finish'
    | 'update_room'
    | 'update_winners';
  data: string;
  id: number;
}
