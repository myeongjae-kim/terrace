import { produce } from 'immer'
import Router from 'next/router';
import { call, put, takeLatest } from "redux-saga/effects";
import { authApi } from 'src/auth/api';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";
import { me } from './me';

const actions = {
  signIn: createAction("@sign/SIGN_IN")<{ email: string, password: string }>(),
  signInAsync: createAsyncAction(
    '@sign/SIGN_IN_REQUEST',
    '@sign/SIGN_IN_SUCCESS',
    '@sign/SIGN_IN_FAILURE',
  )<void, void, { statusCode: number }>(),

  signOut: createAction("@sign/SIGN_OUT")(),
  signOutAsync: createAsyncAction(
    '@sign/SIGN_OUT_REQUEST',
    '@sign/SIGN_OUT_SUCCESS',
    '@sign/SIGN_OUT_FAILURE',
  )<void, void, { statusCode: number }>()
}

export const { signIn, signOut } = actions;
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
  .handleAction([
    actions.signInAsync.request,
    actions.signOutAsync.request,
  ], state => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction([
    actions.signInAsync.success,
    actions.signOutAsync.success,
  ], state => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction([
    actions.signInAsync.failure,
    actions.signOutAsync.failure
  ], (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(signIn), sagaSignIn);
  yield takeLatest(getType(signOut), sagaSignOut);
}

function* sagaSignIn(action: ActionType<typeof actions.signIn>) {
  yield put(actions.signInAsync.request())
  const request = action.payload;
  try {
    yield call(authApi.signIn, request);
    yield put(actions.signInAsync.success());
    Router.back();
    yield put(me());
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

function* sagaSignOut() {
  yield put(actions.signOutAsync.request())
  try {
    yield call(authApi.signOut);
    yield put(actions.signOutAsync.success());
    yield put(me());
  } catch (e) {
    yield put(actions.signOutAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:auth.signOut.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}