export interface GameModel {
  gameId: string | number;
  players: PlayerModel[];
}

export interface PlayerModel {
  playerId: string | number;
  ships: ShipModel[];
  shipsStatus?: ShipStatus[];
}
export interface ShipStatus {
  id: string;
  positions: Position[];
  status: 'alive' | 'dead';
}

export interface Position {
  x: number;
  y: number;
}

export interface ShipModel {
  position: Position;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}
