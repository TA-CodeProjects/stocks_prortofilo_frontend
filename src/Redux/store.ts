import { combineReducers, createStore } from "redux";
import { adminUsersReducer } from "./AdminUserAppState";
import { authReducer } from "./AuthAppState ";
import { stockReducer } from "./StockAppState";
import { stockDataReducer } from "./StockDataAppState";

const reducers = combineReducers({
    authState: authReducer,
    adminUserState: adminUsersReducer,
    stockState: stockReducer,
    stockDataState: stockDataReducer,
})

const store = createStore(reducers);

export default store;