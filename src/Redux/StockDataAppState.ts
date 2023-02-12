import { StockDataModel } from "../Models/StockDataModel";

export class StockDataAppState {
  public stocksData: StockDataModel[] = [];
}

export enum StockDataActionType {
  StockDataDownload = "StockDataDownload",
}

export interface StockDataAction {
  type: StockDataActionType;
  payload?: any;
}



export function StockDataDownloadAction(stockData: StockDataModel): StockDataAction {
  return { type: StockDataActionType.StockDataDownload, payload: stockData };
}

export function stockDataReducer(
  currentState: StockDataAppState = new StockDataAppState(),
  action: StockDataAction
): StockDataAppState {
  const newState = { ...currentState };
  switch (action.type) {
    case StockDataActionType.StockDataDownload:
      newState.stocksData.push(action.payload);
      break;
  }
  return newState;
}
