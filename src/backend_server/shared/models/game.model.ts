export interface GameModel {
  gameId: string | number;
  players: PlayerModel[];
}

export interface PlayerModel {
  playerId: string | number;
  ships: ShipModel[];
}

export interface ShipModel {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}
