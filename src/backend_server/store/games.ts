import {getShipStatus} from '../shared/utils/status-ship';
import {type PlayerModel, type GameModel, type ShipModel, type ShipStatus} from '../shared/models';

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
  console.log(JSON.stringify(playerWithStatus.shipsStatus));
  return playerWithStatus;
};

export const games = new Games();
