import { combineReducers, createStore } from "redux";
import { adminUsersReducer } from "./AdminUserAppState";
import { authReducer } from "./AuthAppState ";
import { stockPerformanceReducer } from "./StockPerformanceAppState";
import { stockDataReducer } from "./StockDataAppState";
import { userStockReducer } from "./UserStockAppState";
import { stockReducer } from "./StockAppState";

const reducers = combineReducers({
  authState: authReducer,
  adminUserState: adminUsersReducer,
  stockPerformanceState: stockPerformanceReducer,
  stockDataState: stockDataReducer,
  userStockState: userStockReducer,
  stockState: stockReducer,
});

const store = createStore(reducers);

export default store;