import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import * as detailModule from "./detail";
import * as listModule from "./list";
import * as formModule from "./form";

export const reducer = combineReducers({
  detail: detailModule.reducer,
  list: listModule.reducer,
  form: formModule.reducer,
});

export function* saga() {
  yield fork(detailModule.saga);
  yield fork(listModule.saga);
  yield fork(formModule.saga);
}