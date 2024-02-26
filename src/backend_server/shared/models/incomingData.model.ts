import {type ShipModel} from './game.model';

export interface addShipsData {
  gameId: string | number;
  ships: ShipModel[];
  indexPlayer: string | number;
}
