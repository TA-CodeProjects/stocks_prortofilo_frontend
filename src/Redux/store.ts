import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState ";

const reducers = combineReducers({
    authState: authReducer,
})

const store = createStore(reducers);

export default store;