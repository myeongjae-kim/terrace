import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import * as detailModule from "./detail";
import * as listModule from "./list";
import { combineEpics } from "redux-observable";

export const reducer = combineReducers({
  detail: detailModule.reducer,
  list: listModule.reducer
});

export function* saga() {
  yield fork(listModule.saga);
}

export const epic = combineEpics(detailModule.epic);
