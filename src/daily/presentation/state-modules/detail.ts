import { produce } from 'immer'
import { call, put, takeLeading } from "redux-saga/effects";
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import { DailyDetailRequestDto, DailyDetailResponseDto, dailyFetcher } from 'src/daily/api';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  reset: createAction("@dailyDetail/RESET")(),
  fetchDaily: createAction("@dailyDetail/FETCH_DAILY_DETAIL")<{
    daily: DailyDetailRequestDto
  }>(),
  fetchDailyAsync: createAsyncAction(
    '@dailyDetail/FETCH_DAILY_DETAIL_REQUEST',
    '@dailyDetail/FETCH_DAILY_DETAIL_SUCCESS',
    '@dailyDetail/FETCH_DAILY_DETAIL_FAILURE',
  )<void, { daily: DailyDetailResponseDto }, { statusCode: number }>()
}

export const { reset, fetchDaily } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  daily: DailyDetailResponseDto
  pending: boolean
  rejected: boolean
  statusCode: number
}

const createInitialState = (): State => ({
  daily: {
    id: "",
    seq: -1,
    createdAt: "",
    updatedAt: "",
    title: "",
    slug: "",
    content: ""
  },
  pending: true,
  rejected: false,
  statusCode: 200
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(reset, createInitialState)
  .handleAction(actions.fetchDailyAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchDailyAsync.success, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.daily = action.payload.daily;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchDailyAsync.failure, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }))

export function* saga() {
  yield takeLeading(getType(fetchDaily), sagaFetchDaily);
}

function* sagaFetchDaily(action: ActionType<typeof actions.fetchDaily>) {
  yield put(actions.fetchDailyAsync.request())
  try {
    const daily: DailyDetailResponseDto = yield call(dailyFetcher.find, action.payload.daily);
    yield put(actions.fetchDailyAsync.success({ daily }));
  } catch (e) {
    yield put(actions.fetchDailyAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:daily.find.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}