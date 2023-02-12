export class DayModel {
    public day: Date;
    public price: number;

    public constructor(day: Date, price: number) {
        this.day = day;
        this.price = price;
    }
}
