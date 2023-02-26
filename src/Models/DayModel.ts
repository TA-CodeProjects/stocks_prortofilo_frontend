export class DayModel {
    public day: Date;
    public price: number;
    public sma: number;
    

    public constructor(day: Date, price: number, sma: number) {
        this.day = day;
        this.price = price;
        this.sma = sma;
    }
}
