export class UserStockHistoryModel {
    public id: number;
    public date: string;
    public amount: number;
    public price: number;
    public transactionType: "BUY" | "SELL";

    public constructor(id: number, date: string, amount: number, price: number, transactionType: "BUY" | "SELL") {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.price = price;
        this.transactionType = transactionType;
    }
}