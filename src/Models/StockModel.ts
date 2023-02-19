export class StockModel {
    public id: number;
    public stockName: string;

    public constructor(id: number, stockName: string) {
        this.id = id;
        this.stockName = stockName;
    }
}