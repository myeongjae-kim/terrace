import { combineReducers, } from "redux";
import { reducer as formReducer } from 'redux-form';
import { fork } from "redux-saga/effects";
import * as blogModule from "src/blog/presentation/state-modules"
import * as dailyModule from "src/daily/presentation/state-modules"
import * as motherModule from "src/mother/presentation/state-modules"
import * as musingsModule from "src/musings/presentation/state-modules"
import { StateType } from "typesafe-actions";
import * as commonModule from "./common"
import * as snackbarModule from "./snackbar"

export const rootReducer = combineReducers({
  form: formReducer,

  common: commonModule.reducer,
  snackbar: snackbarModule.reducer,

  blog: blogModule.reducer,
  mother: motherModule.reducer,
  musings: musingsModule.reducer,
  daily: dailyModule.reducer,
});

export function* rootSaga() {
  yield fork(blogModule.saga);
  yield fork(motherModule.saga);
  yield fork(musingsModule.saga);
  yield fork(dailyModule.saga);
}

export type RootState = StateType<typeof rootReducer>