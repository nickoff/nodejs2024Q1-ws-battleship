import {type ShipModel} from './game.model';

export interface addShipsData {
  gameId: string | number;
  ships: ShipModel[];
  indexPlayer: string | number;
}

export interface AttackData {
  gameId: number | string;
  x?: number;
  y?: number;
  indexPlayer: number | string;
}
