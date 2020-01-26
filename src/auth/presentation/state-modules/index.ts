import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import * as signInModule from "./sign-in";

export const reducer = combineReducers({
  signIn: signInModule.reducer,
});

export function* saga() {
  yield fork(signInModule.saga);
}