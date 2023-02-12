import { DayModel } from "./DayModel";

export class StockDataModel {
  public stockName: string;
  public lastRefreshed: Date;
  public days?: DayModel[] = [];
  
  constructor(stockName: string, lastRefreshed: Date, days?: DayModel[]) {
    this.stockName = stockName;
    this.lastRefreshed = lastRefreshed;
    this.days = days;
  }
}