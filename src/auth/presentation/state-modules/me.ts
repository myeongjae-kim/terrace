import { produce } from 'immer'
import { call, put, takeLeading } from "redux-saga/effects";
import { authApi } from 'src/auth/api';
import { MeResponse } from 'src/auth/api/dto/MeResponse';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  me: createAction("@me/me")(),
  meAsync: createAsyncAction(
    '@me/ME_REQUEST',
    '@me/ME_SUCCESS',
    '@me/ME_FAILURE',
  )<void, MeResponse, { statusCode: number }>(),

  resetMe: createAction("@me/resetMe")()
}

export const { me, resetMe } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  me: MeResponse
  isSignedIn: boolean
  pending: boolean
  rejected: boolean
  statusCode: number
}

const createInitialState = (): State => ({
  me: {
    email: ""
  },
  isSignedIn: false,
  pending: false,
  rejected: false,
  statusCode: 200
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.meAsync.request, state => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.meAsync.success, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.me = action.payload;
    draft.isSignedIn = !!draft.me.email;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.meAsync.failure, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }))
  .handleAction(actions.resetMe, state => produce(state, draft => {
    draft.me = { email: "" };
    draft.isSignedIn = false;
    return draft;
  }))

export function* saga() {
  yield takeLeading(getType(me), sagaMe);
}

function* sagaMe() {
  yield put(actions.meAsync.request())
  try {
    const res: MeResponse = yield call(authApi.me);
    yield put(actions.meAsync.success(res));
  } catch (e) {
    yield put(actions.meAsync.failure({ statusCode: e.status }));
    yield put(actions.resetMe());
    if (e.status === 400 || e.status === 401) {
      return;
    }
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:auth.me.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}