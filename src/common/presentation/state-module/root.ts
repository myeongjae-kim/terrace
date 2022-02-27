import {combineReducers,} from "redux";
import {reducer as formReducer} from "redux-form";
import {StateType} from "typesafe-actions";
import * as commonModule from "./common";

export const rootReducer = combineReducers({
  form: formReducer,

  common: commonModule.reducer,
});

export function* rootSaga() {
}

export type RootState = StateType<typeof rootReducer>;
