import {type UserModel} from 'backend_server/shared/models';

export class Users {
  private readonly users: UserModel[] = [];

  public getUsers = (): UserModel[] => {
    return this.users;
  };

  public getUser = (
    userName: string,
    userPassword: string,
    currentSessionId?: string,
  ): UserModel | undefined => {
    if (this.users.find(user => user.name === userName) != null) {
      if (
        this.users.find(user => user.name === userName && user.password === userPassword) != null
      ) {
        const currentUser = this.users.find(
          user => user.name === userName && user.password === userPassword,
        );
        if (currentUser != null) {
          return {
            ...currentUser,
            currentSessionId,
          };
        }
      }
      throw new Error('Wrong password');
    } else {
      this.users.push({
        name: userName,
        index: new Date().getTime().toString(),
        password: userPassword,
        currentSessionId,
      });
      return this.users.find(user => user.name === userName && user.password === userPassword);
    }
  };

  public getUserByCurrentSessionId = (currentSessionId: string): UserModel | undefined =>
    this.users.find(user => user.currentSessionId === currentSessionId);
}

export const users = new Users();
