import { produce } from 'immer'
import Router from 'next/router';
import { call, put, takeLatest } from "redux-saga/effects";
import { authApi } from 'src/auth/api';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  signIn: createAction("@signIn/signIn")<{ email: string, password: string }>(),
  signInAsync: createAsyncAction(
    '@signIn/SIGN_IN_REQUEST',
    '@signIn/SIGN_IN_SUCCESS',
    '@signIn/SIGN_IN_FAILURE',
  )<void, void, { statusCode: number }>()
}

export const { signIn } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  pending: boolean
  rejected: boolean
  statusCode: number
}

const createInitialState = (): State => ({
  pending: false,
  rejected: false,
  statusCode: 200
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.signInAsync.request, state => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.signInAsync.success, state => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.signInAsync.failure, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(signIn), sagaSignIn);
}

function* sagaSignIn(action: ActionType<typeof actions.signIn>) {
  yield put(actions.signInAsync.request())
  const request = action.payload;
  try {
    yield call(authApi.signIn, request);
    yield put(actions.signInAsync.success());
    Router.back();
  } catch (e) {
    yield put(actions.signInAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:auth.signIn.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}