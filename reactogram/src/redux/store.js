import { createStore } from "redux";
import { combineReducer } from "./combinereducer";

export const store = createStore(
    combineReducer
)