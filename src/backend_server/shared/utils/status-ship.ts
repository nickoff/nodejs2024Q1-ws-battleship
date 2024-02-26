import {type ShipStatus, type Position, type ShipModel} from '../models';

export const getShipPositions = (ship: ShipModel): Position[] => {
  const positions: Position[] = [];
  for (let i = 0; i < ship.length; i += 1) {
    if (ship.direction) {
      positions.push({x: ship.position.x, y: ship.position.y + i});
    } else {
      positions.push({x: ship.position.x + i, y: ship.position.y});
    }
  }
  return positions;
};

export const getShipStatus = (ship: ShipModel, index: number): ShipStatus => {
  return {
    id: `${ship.type}_${index}`,
    positions: getShipPositions(ship),
    status: 'alive',
  };
};
