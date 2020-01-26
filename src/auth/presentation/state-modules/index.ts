import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import * as meModule from "./me";
import * as signModule from "./sign";

export const reducer = combineReducers({
  me: meModule.reducer,
  signIn: signModule.reducer,
});

export function* saga() {
  yield fork(meModule.saga);
  yield fork(signModule.saga);
}