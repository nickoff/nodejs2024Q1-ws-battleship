import {type WinnerModel} from '../shared/models';

export class Winners {
  private readonly winners: WinnerModel[] = [];
  public getWinners = (): WinnerModel[] => {
    return this.winners;
  };

  public addWinner = (userName: string): void => {
    const winner = this.winners.find(w => w.name === userName);
    if (winner != null) {
      winner.wins += 1;
    } else {
      this.winners.push({
        name: userName,
        wins: 1,
      });
    }
  };
}

export const winners = new Winners();
