import { DayModel } from "../Models/DayModel";
import { StockPerformanceModel } from "../Models/StockPerformanceModel";

export  class StockPerformanceAppState {
  public stocksPerformance: StockPerformanceModel[] = [];
  public stockDays: DayModel[] = [];
}

export enum StockPerformanceActionType {
  StocksPerformanceDownload = "StocksPerformanceDownload",
  StockDaysDownload = "StockDaysDownload",
  StocksPerformanceClear = "StocksPerformanceClear",
}

export interface StockPerformanceAction {
  type: StockPerformanceActionType;
  payload?: any;
}

export function stockPerformanceDownloadedAction(
  stocksPerformance: StockPerformanceModel[]
): StockPerformanceAction {
  return { type: StockPerformanceActionType.StocksPerformanceDownload, payload: stocksPerformance };
}

export function StockDaysDownloadAction(stockDays: DayModel[]): StockPerformanceAction {
  return { type: StockPerformanceActionType.StockDaysDownload, payload: stockDays };
}

export function stockPerformanceReducer(
  currentState: StockPerformanceAppState = new StockPerformanceAppState(),
  action: StockPerformanceAction
): StockPerformanceAppState {
  const newState = { ...currentState };
  switch (action.type) {
    case StockPerformanceActionType.StocksPerformanceDownload:
      newState.stocksPerformance = action.payload;
      break;
    case StockPerformanceActionType.StockDaysDownload:
      newState.stockDays = action.payload;
      break;
  }
  return newState;
}