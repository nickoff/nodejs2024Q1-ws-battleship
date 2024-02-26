/* eslint-disable consistent-return */
import {getShipStatus} from '../shared/utils/status-ship';
import {
  type PlayerModel,
  type GameModel,
  type ShipModel,
  type ShipStatus,
  type Position,
} from '../shared/models';

export class Games {
  private games: GameModel[] = [];

  public getGames = (): GameModel[] => {
    return this.games;
  };

  public addPlayerToGame = (gameId: string | number, player: PlayerModel): void => {
    if (this.games.find(game => game.gameId === gameId) == null) {
      const playerWithStatus = getPlayerWithStatus(player.ships, player);
      this.games.push({
        gameId,
        players: [playerWithStatus],
      });
    } else {
      const game = this.games.find(item => item.gameId === gameId);
      if (game != null) {
        const playerWithStatus = getPlayerWithStatus(player.ships, player);
        game.players.push(playerWithStatus);
      }
    }
  };

  public deleteGame = (gameId: string | number): void => {
    if (this.games.find(game => game.gameId === gameId) != null) {
      this.games = this.games.filter(game => game.gameId !== gameId);
    }
  };

  public updateGameStatus = (
    game: GameModel,
    enemyPlayerId: string | number,
    positionAtack: Position,
  ): 'shot' | 'killed' | undefined => {
    const enemyPlayerState = game.players.find(item => item.playerId === enemyPlayerId);
    if (enemyPlayerState == null) return undefined;
    const statusAttack = enemyPlayerState.shipsStatus?.find(item =>
      item.positions.find(p => p.x === positionAtack.x && p.y === positionAtack.y),
    );
    const attackedShip = statusAttack?.id;

    this.games = this.games.map(obj => {
      return {
        ...obj,
        players: obj.players.map(item => {
          if (item.playerId === enemyPlayerId) {
            return {
              ...item,
              shipsStatus: item.shipsStatus?.map(ship => {
                if (ship.id === statusAttack?.id) {
                  return {
                    ...ship,
                    positions: ship.positions.filter(
                      p => !(p.x === positionAtack.x && p.y === positionAtack.y),
                    ),
                    status: ship.positions.length === 0 ? 'killed' : 'alive',
                  };
                }
                return ship;
              }),
            };
          }
          return item;
        }),
      };
    });

    this.games = this.games.map(obj => {
      return {
        ...obj,
        players: obj.players.map(item => {
          if (item.playerId === enemyPlayerId) {
            return {
              ...item,
              shipsStatus: item.shipsStatus?.map(ship => {
                if (ship.id === statusAttack?.id) {
                  return {
                    ...ship,
                    status: ship.positions.length === 0 ? 'killed' : 'alive',
                  };
                }
                return ship;
              }),
            };
          }
          return item;
        }),
      };
    });

    const statusAttackedShip = this.games
      .find(g => g.gameId === game.gameId)
      ?.players.find(player => player.playerId === enemyPlayerId)
      ?.shipsStatus?.find(ship => ship.id === attackedShip);

    if (statusAttackedShip != null && statusAttackedShip.status === 'killed') {
      return 'killed';
    }
    if (statusAttackedShip != null && statusAttackedShip.status === 'alive') {
      return 'shot';
    }
  };
}

const getPlayerWithStatus = (ships: ShipModel[], player: PlayerModel): PlayerModel => {
  const shipsStatus: ShipStatus[] = [];
  ships.forEach((ship, index) => {
    shipsStatus.push(getShipStatus(ship, index));
  });
  const playerWithStatus = {
    ...player,
    shipsStatus,
  };
  return playerWithStatus;
};

export const games = new Games();
