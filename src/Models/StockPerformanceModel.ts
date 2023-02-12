import { DayModel } from "./DayModel";

export class StockPerformanceModel {
    public stockName: string;
    public day0: DayModel;
    public day1: DayModel;
    public day5: DayModel;
    public day22: DayModel;
    public day66: DayModel;

    public constructor(stockName: string, day0: DayModel, day1: DayModel, day5: DayModel, day22: DayModel, day66: DayModel) {
        this.stockName = stockName;
        this.day0 = day0;
        this.day1 = day1;
        this.day5 = day5;
        this.day22 = day22;
        this.day66 = day66;
    }

}