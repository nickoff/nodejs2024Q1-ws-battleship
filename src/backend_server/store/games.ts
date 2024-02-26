import {type PlayerModel, type GameModel} from '../shared/models';

export class Games {
  private games: GameModel[] = [];

  public getGames = (): GameModel[] => {
    return this.games;
  };

  public addPlayerToGame = (gameId: string | number, player: PlayerModel): void => {
    if (this.games.find(game => game.gameId === gameId) == null) {
      this.games.push({
        gameId,
        players: [player],
      });
    } else {
      const game = this.games.find(item => item.gameId === gameId);
      if (game != null) {
        game.players.push(player);
      }
    }
  };

  public deleteGame = (gameId: string | number): void => {
    if (this.games.find(game => game.gameId === gameId) != null) {
      this.games = this.games.filter(game => game.gameId !== gameId);
    }
  };
}

export const games = new Games();
