import { combineReducers } from "redux";
import { spawn } from "redux-saga/effects";
import * as listModule from "./list";

export const reducer = combineReducers({
  list: listModule.reducer
});

export function* saga() {
  yield spawn(listModule.saga);
}