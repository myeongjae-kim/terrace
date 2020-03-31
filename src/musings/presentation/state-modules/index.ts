import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import * as listModule from "./list";

export const reducer = combineReducers({
  list: listModule.reducer
});

export function* saga() {
  yield fork(listModule.saga);
}