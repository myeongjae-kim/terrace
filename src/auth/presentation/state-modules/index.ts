import {combineReducers} from "redux";
import {fork} from "redux-saga/effects";
import * as signModule from "./sign";

export const reducer = combineReducers({
  signIn: signModule.reducer,
});

export function* saga() {
  yield fork(signModule.saga);
}
