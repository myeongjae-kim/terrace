import { produce } from 'immer'
import { call, put, takeLatest } from "redux-saga/effects";
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import { DailyDetailRequestDto, DailyDetailResponseDto, dailyFetcher } from 'src/daily/api';
import stringify from 'src/util/stringify';
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";

const actions = {
  reset: createStandardAction("@dailyDetail/RESET")(),
  fetchDaily: createStandardAction("@dailyDetail/FETCH_DAILY_DETAIL")<{
    daily: DailyDetailRequestDto
  }>(),
  fetchDailyAsync: createAsyncAction(
    '@dailyDetail/FETCH_DAILY_DETAIL_REQUEST',
    '@dailyDetail/FETCH_DAILY_DETAIL_SUCCESS',
    '@dailyDetail/FETCH_DAILY_DETAIL_FAILURE',
  )<void, { daily: DailyDetailResponseDto }, void>()
}

export const { reset, fetchDaily } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  daily: DailyDetailResponseDto
  pending: boolean
  rejected: boolean
}

const createInitialState = () => ({
  daily: {
    id: "-1",
    seq: -1,
    createdAt: "",
    updatedAt: "",
    title: "",
    slug: "",
    content: ""
  },
  pending: true,
  rejected: false
} as State);

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset), createInitialState)
  .handleAction(getType(actions.fetchDailyAsync.request), (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    return draft;
  }))
  .handleAction(getType(actions.fetchDailyAsync.success), (state, action) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.daily = action.payload.daily;
    return draft;
  }))
  .handleAction(getType(actions.fetchDailyAsync.failure), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchDaily), sagaFetchDaily);
}

function* sagaFetchDaily(action: ActionType<typeof actions.fetchDaily>) {
  yield put(actions.fetchDailyAsync.request())
  try {
    const daily: DailyDetailResponseDto = yield call(dailyFetcher.find, action.payload.daily);
    yield put(actions.fetchDailyAsync.success({ daily }));
  } catch (e) {
    yield put(actions.fetchDailyAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:daily.findAll.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}