import {type GameModel} from '../shared/models';

export class Games {
  private games: GameModel[] = [];

  public getGames = (): GameModel[] => {
    return this.games;
  };

  public addGame = (game: GameModel): void => {
    this.games.push(game);
  };

  public deleteGame = (gameId: string): void => {
    if (this.games.find(game => game.gameId === gameId) != null) {
      this.games = this.games.filter(game => game.gameId !== gameId);
    }
  };
}

export const games = new Games();
