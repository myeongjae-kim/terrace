import { combineReducers, } from "redux";
import { reducer as formReducer } from 'redux-form';
import { fork } from "redux-saga/effects";
import { StateType } from "typesafe-actions";
import * as motherModule from "../../../mother/presentation/state-module"
import * as commonModule from "./common"
import * as snackbarModule from "./snackbar"

export const rootReducer = combineReducers({
  form: formReducer,

  common: commonModule.reducer,
  snackbar: snackbarModule.reducer,

  mother: motherModule.reducer,
});

export function* rootSaga() {
  yield fork(motherModule.saga);
}

export type RootState = StateType<typeof rootReducer>