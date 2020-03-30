import { combineReducers, } from "redux";
import { reducer as formReducer } from "redux-form";
import { spawn } from "redux-saga/effects";
import * as authModule from "src/auth/presentation/state-modules";
import * as blogModule from "src/blog/presentation/state-modules";
import * as dailyModule from "src/daily/presentation/state-modules";
import * as musingsModule from "src/musings/presentation/state-modules";
import { StateType } from "typesafe-actions";
import * as commonModule from "./common";
import * as snackbarModule from "./snackbar";

export const rootReducer = combineReducers({
  form: formReducer,

  auth: authModule.reducer,
  common: commonModule.reducer,
  snackbar: snackbarModule.reducer,

  blog: blogModule.reducer,
  musings: musingsModule.reducer,
  daily: dailyModule.reducer,
});

export function* rootSaga() {
  yield spawn(authModule.saga);
  yield spawn(blogModule.saga);
  yield spawn(musingsModule.saga);
  yield spawn(dailyModule.saga);
}

export type RootState = StateType<typeof rootReducer>;