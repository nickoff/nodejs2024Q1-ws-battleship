import {type UserModel} from 'backend_server/shared/models';

export class Users {
  private readonly users: UserModel[] = [];

  public getUsers = (): UserModel[] => {
    return this.users;
  };

  public getUser = (userName: string, userPassword: string): UserModel | undefined => {
    if (this.users.find(user => user.name === userName) != null) {
      if (
        this.users.find(user => user.name === userName && user.password === userPassword) != null
      ) {
        return this.users.find(user => user.name === userName && user.password === userPassword);
      }
      throw new Error('Wrong password');
    } else {
      this.users.push({
        name: userName,
        index: new Date().getTime().toString(),
        password: userPassword,
      });
      return this.users.find(user => user.name === userName && user.password === userPassword);
    }
  };
}

export const users = new Users();
