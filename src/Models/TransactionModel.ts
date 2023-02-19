export class TransactionModel {
    public stockName: string;
    public date: string;
    public amount: number;
    public price: number;
    public transactionType: "BUY" | "SELL";

    public constructor(stockName: string, date: string, amount: number, price: number, transactionType: "BUY" | "SELL") {
        this.stockName = stockName;
        this.date = date;
        this.amount = amount;
        this.price = price;
        this.transactionType = transactionType;
    }
}