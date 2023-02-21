import { UserStockModel } from "./UserStockModel";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public stocks: UserStockModel[] = [];

  public constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    stocks: UserStockModel[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.stocks = stocks;
  }
}