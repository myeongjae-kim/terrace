import { combineReducers } from "redux";
import * as detailModule from "./detail";
import * as listModule from "./list";
import { combineEpics } from "redux-observable";

export const reducer = combineReducers({
  detail: detailModule.reducer,
  list: listModule.reducer
});

export const epic = combineEpics(detailModule.epic, listModule.epic);