import {type WinnerModel} from 'backend_server/shared/models';

export class Winners {
  private readonly winners: WinnerModel[] = [];
  public getWinners = (): WinnerModel[] => {
    return this.winners;
  };

  public addWinner = (winner: WinnerModel): void => {
    this.winners.push(winner);
  };
}

export const winners = new Winners();
