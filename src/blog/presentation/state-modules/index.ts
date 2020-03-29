import { combineReducers } from "redux";
import { spawn } from "redux-saga/effects";
import * as detailModule from "./detail";
import * as formModule from "./form";
import * as listModule from "./list";

export const reducer = combineReducers({
  detail: detailModule.reducer,
  form: formModule.reducer,
  list: listModule.reducer
});

export function* saga() {
  yield spawn(detailModule.saga);
  yield spawn(formModule.saga);
  yield spawn(listModule.saga);
}