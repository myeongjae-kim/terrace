import {combineReducers,} from "redux";
import {StateType} from "typesafe-actions";
import * as commonModule from "./common";

export const rootReducer = combineReducers({
  common: commonModule.reducer,
});

export function* rootSaga() {
}

export type RootState = StateType<typeof rootReducer>;
