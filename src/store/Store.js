import {applyMiddleware, createStore} from "redux";
import{CallerReducer} from "../reducers/CallerReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const store = createStore(CallerReducer, applyMiddleware(thunk, logger));