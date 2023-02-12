import axios from "axios";
import { StockDataModel } from "../Models/StockDataModel";
import { StockPerformanceModel } from "../Models/StockPerformanceModel";
import globals from "../Services/Globals";

export async function getStocksPerformance() {
    return await axios.get<StockPerformanceModel[]>(globals.urls.stocks);
}

export async function getStockDay(stockName: string){
    return await axios.get<StockDataModel>(globals.urls.stocks + stockName);
}