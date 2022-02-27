import {combineReducers,} from "redux";
import {reducer as formReducer} from "redux-form";
import {StateType} from "typesafe-actions";
import * as commonModule from "./common";
import * as snackbarModule from "./snackbar";

export const rootReducer = combineReducers({
  form: formReducer,

  common: commonModule.reducer,
  snackbar: snackbarModule.reducer,

});

export function* rootSaga() {
}

export type RootState = StateType<typeof rootReducer>;
