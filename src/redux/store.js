import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { AuthReducer } from "./auth/reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({ AuthReducer });

const store = legacy_createStore(reducers, applyMiddleware(thunk));

export { store }