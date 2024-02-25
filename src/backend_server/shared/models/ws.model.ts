export interface IncomingClientMessage {
  type:
    | 'reg'
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
