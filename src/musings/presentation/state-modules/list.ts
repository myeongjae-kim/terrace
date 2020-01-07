import { produce } from 'immer'
import { call, put, takeLatest } from "redux-saga/effects";
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import { MusingResponseDto, musingsFetcher } from 'src/musings/api';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

export const reset = createAction("@musingList/RESET")();

export const fetchMusings = createAction("@musingList/FETCH_MUSING_LIST")();
const fetchMusingsAsync = createAsyncAction(
  '@musingList/FETCH_MUSING_LIST_REQUEST',
  '@musingList/FETCH_MUSING_LIST_SUCCESS',
  '@musingList/FETCH_MUSING_LIST_FAILURE',
)<void, { musings: MusingResponseDto[] }, void>();

export type Action = ActionType<
  typeof reset |
  typeof fetchMusings |
  typeof fetchMusingsAsync.request |
  typeof fetchMusingsAsync.success |
  typeof fetchMusingsAsync.failure
>

export interface State {
  musings: MusingResponseDto[]
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
  musings: [],
  pending: true,
  rejected: false
} as State);

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(reset, createInitialState)
  .handleAction(fetchMusingsAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(fetchMusingsAsync.success, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.musings = action.payload.musings;
    return draft;
  }))
  .handleAction(fetchMusingsAsync.failure, (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchMusings), sagaFetchMusing);
}

function* sagaFetchMusing() {
  yield put(fetchMusingsAsync.request())
  try {
    const musings: MusingResponseDto[] = yield call(musingsFetcher.findAll);
    yield put(fetchMusingsAsync.success({ musings }));
  } catch (e) {
    yield put(fetchMusingsAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:musings.findAll.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}