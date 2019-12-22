import { combineReducers } from "redux";

import { fork } from "redux-saga/effects";
import * as noticeModule from "../../notice/presentation/state-module";

export const reducer = combineReducers({
  notice: noticeModule.reducer
});

export function* saga() {
  yield fork(noticeModule.saga)
}