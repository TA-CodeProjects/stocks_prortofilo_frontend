import { DayModel } from "../Models/DayModel";
import { StockPerformanceModel } from "../Models/StockPerformanceModel";

export  class StockAppState {
    public stocksPerformance: StockPerformanceModel[] = [];
    public stockDays: DayModel[] = [];
}

export enum StockActionType {
  StocksPerformanceDownload = "StocksPerformanceDownload",
  StockDaysDownload = "StockDaysDownload",
  StocksPerformanceClear = "StocksPerformanceClear",
}

export interface StockAction {
    type: StockActionType;
    payload?: any; 
}

export function stockPerformanceDownloadedAction(stocksPerformance: StockPerformanceModel[]): StockAction {
    return { type: StockActionType.StocksPerformanceDownload, payload: stocksPerformance };
}

export function StockDaysDownloadAction(stockDays: DayModel[]): StockAction {
    return { type: StockActionType.StockDaysDownload, payload: stockDays};
}

export function stockReducer(currentState: StockAppState = new StockAppState(), action: StockAction): StockAppState {
    const newState = {...currentState};
    switch (action.type) {
        case StockActionType.StocksPerformanceDownload:
            newState.stocksPerformance = action.payload;
            break;
        case StockActionType.StockDaysDownload:
            newState.stockDays = action.payload;
            break;
    }
    return newState;
}