import { produce } from 'immer'
import { call, put, takeLatest } from "redux-saga/effects";
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import { dailyFetcher, DailyListResponseDto } from 'src/daily/api';
import stringify from 'src/util/stringify';
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";

export const reset = createStandardAction("@dailyList/RESET")();

export const fetchDailys = createStandardAction("@dailyList/FETCH_DAILY_LIST")();
const fetchDailysAsync = createAsyncAction(
  '@dailyList/FETCH_DAILY_LIST_REQUEST',
  '@dailyList/FETCH_DAILY_LIST_SUCCESS',
  '@dailyList/FETCH_DAILY_LIST_FAILURE',
)<void, { dailys: DailyListResponseDto[] }, void>();

export type Action = ActionType<
  typeof reset |
  typeof fetchDailys |
  typeof fetchDailysAsync.request |
  typeof fetchDailysAsync.success |
  typeof fetchDailysAsync.failure
>

export interface State {
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
  dailys: [],
  pending: true,
  rejected: false
} as State);

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset), createInitialState)
  .handleAction(getType(fetchDailysAsync.request), (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(getType(fetchDailysAsync.success), (state, action) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.dailys = action.payload.dailys;
    return draft;
  }))
  .handleAction(getType(fetchDailysAsync.failure), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchDailys), sagaFetchDaily);
}

function* sagaFetchDaily() {
  yield put(fetchDailysAsync.request())
  try {
    const dailys: DailyListResponseDto[] = yield call(dailyFetcher.findAll);
    yield put(fetchDailysAsync.success({ dailys }));
  } catch (e) {
    yield put(fetchDailysAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:daily.findAll.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}