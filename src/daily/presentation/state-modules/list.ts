import { produce } from "immer";
import { call, put, takeLeading } from "redux-saga/effects";
import { enqueueSnackbar } from "src/common/presentation/state-module/snackbar";
import { dailyApi, DailyListResponseDto } from "src/daily/api";
import stringify from "src/util/stringify";
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  reset: createAction("@dailyList/RESET")(),
  fetchDailys: createAction("@dailyList/FETCH_DAILY_LIST")(),
  fetchDailysAsync: createAsyncAction(
    "@dailyList/FETCH_DAILY_LIST_REQUEST",
    "@dailyList/FETCH_DAILY_LIST_SUCCESS",
    "@dailyList/FETCH_DAILY_LIST_FAILURE",
  )<void, { dailys: DailyListResponseDto[] }, void>()
};

export const { reset, fetchDailys } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  dailys: DailyListResponseDto[];
  pending: boolean;
  rejected: boolean;
}

// Initial State
const createInitialState = (): State => ({
  dailys: [],
  pending: true,
  rejected: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.reset, createInitialState)
  .handleAction(actions.fetchDailysAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    return draft;
  }))
  .handleAction(actions.fetchDailysAsync.success, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.dailys = action.payload.dailys;
    return draft;
  }))
  .handleAction(actions.fetchDailysAsync.failure, (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }));

export function* saga() {
  yield takeLeading(getType(fetchDailys), sagaFetchDaily);
}

function* sagaFetchDaily() {
  yield put(actions.fetchDailysAsync.request());
  try {
    const dailys: DailyListResponseDto[] = yield call(dailyApi.findAll);
    yield put(actions.fetchDailysAsync.success({ dailys }));
  } catch (e) {
    yield put(actions.fetchDailysAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.findAll.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}