import { UserStockModel } from "../Models/UserStockModel";

export class UserStockAppState {
  public userStocks: UserStockModel[] = [];
}

export enum UserStockActionType {
  UserStocksDownloaded = "UserStocksDownloaded",
  UserStockAdded = "UserStockAdded",
}

export interface UserStockAction {
  type: UserStockActionType;
  payload?: any;
}

export function userStocksDownloaded(userStocks: UserStockModel[]): UserStockAction {
  return {
    type: UserStockActionType.UserStocksDownloaded,
    payload: userStocks,
  };
}

export function userStockAdded(userStock: UserStockModel): UserStockAction {
  return { type: UserStockActionType.UserStockAdded, payload: userStock };
}

export function userStockReducer(
  currentState: UserStockAppState = new UserStockAppState(),
  action: UserStockAction
): UserStockAppState {
  const newState = { ...currentState };
  switch (action.type) {
    case UserStockActionType.UserStocksDownloaded:
      newState.userStocks = action.payload;
      break;
    case UserStockActionType.UserStockAdded:
      newState.userStocks = newState.userStocks.filter((stock) => stock.id !== action.payload.id);
      newState.userStocks.push(action.payload);
      break;
  }
  return newState;
}
