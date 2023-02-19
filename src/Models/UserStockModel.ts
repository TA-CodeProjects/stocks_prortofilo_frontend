import { UserStockHistoryModel } from "./UserStockHistoryModel";

export class UserStockModel {
  public id: number;
  public amount: number;
  public stockName: string;
  public userStockHistoryList: UserStockHistoryModel[] = [];

  public constructor(id: number, amount: number, stockName: string, userStockHistoryList: UserStockHistoryModel[]) {
    this.id = id;
    this.amount = amount;
    this.stockName = stockName;
    this.userStockHistoryList = userStockHistoryList;
  }
}