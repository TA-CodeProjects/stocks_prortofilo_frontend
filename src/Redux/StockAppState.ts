import { StockModel } from "../Models/StockModel";

export class StockAppState {
  public stocks: StockModel[] = [];
}

export enum StockActionType {
  StockDownloaded = "StockDownloaded",
  StockAdded = "StockAdded",
  StockDeleted = "StockDeleted",
}

export interface StockAction {
  type: StockActionType;
  payload?: any;
}

export function stocksDownloaded(stocks: StockModel[]): StockAction {
  return { type: StockActionType.StockDownloaded, payload: stocks };
}

export function stocksAdded(stock: StockModel): StockAction {
  return { type: StockActionType.StockAdded, payload: stock };
}

export function stocksDeleted(id: number): StockAction {
  return { type: StockActionType.StockDeleted, payload: id };
}

export function stockReducer(
  currentState: StockAppState = new StockAppState(),
  action: StockAction
): StockAppState {
    const newState = {...currentState};
    switch (action.type) {
        case StockActionType.StockDownloaded:
            newState.stocks = action.payload;
            break;
        case StockActionType.StockAdded:
            newState.stocks.push(action.payload);
            break;
        case StockActionType.StockDeleted:
            newState.stocks = newState.stocks.filter(stock => stock.id !== action.payload);
            break;
    }
    return newState;
}
