import { combineReducers } from "redux";
import { spawn } from "redux-saga/effects";
import * as detailModule from "./detail";
import * as listModule from "./list";

export const reducer = combineReducers({
  detail: detailModule.reducer,
  list: listModule.reducer
});

export function* saga() {
  yield spawn(detailModule.saga);
  yield spawn(listModule.saga);
}