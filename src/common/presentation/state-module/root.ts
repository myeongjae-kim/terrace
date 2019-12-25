import { combineReducers, } from "redux";
import { reducer as formReducer } from 'redux-form';
import { fork } from "redux-saga/effects";
import * as motherModule from "src/mother/presentation/state-modules"
import * as musingsModule from "src/musings/presentation/state-modules"
import { StateType } from "typesafe-actions";
import * as commonModule from "./common"
import * as snackbarModule from "./snackbar"

export const rootReducer = combineReducers({
  form: formReducer,

  common: commonModule.reducer,
  snackbar: snackbarModule.reducer,

  mother: motherModule.reducer,
  musings: musingsModule.reducer,
});

export function* rootSaga() {
  yield fork(motherModule.saga);
  yield fork(musingsModule.saga);
}

export type RootState = StateType<typeof rootReducer>