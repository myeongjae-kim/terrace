import {produce} from "immer";
import {call, put, takeLeading} from "redux-saga/effects";
import {enqueueSnackbar} from "src/common/presentation/state-module/snackbar";
import {dailyApi, DailyDetailResponseDto, DailyPathDto} from "src/daily/api";
import stringify from "src/util/stringify";
import {ActionType, createAction, createAsyncAction, createReducer, getType} from "typesafe-actions";
import Router from "next/router";
import {Endpoints} from "src/common/constants/Constants";

const actions = {
  reset: createAction("@dailyDetail/RESET")(),
  fetchDaily: createAction("@dailyDetail/FETCH_DAILY_DETAIL")<{
    daily: DailyPathDto;
  }>(),
  fetchDailyAsync: createAsyncAction(
    "@dailyDetail/FETCH_DAILY_DETAIL_REQUEST",
    "@dailyDetail/FETCH_DAILY_DETAIL_SUCCESS",
    "@dailyDetail/FETCH_DAILY_DETAIL_FAILURE",
  )<void, { daily: DailyDetailResponseDto }, { statusCode: number }>(),

  deleteDaily: createAction("@dailyDetail/DELETE_DAILY_DETAIL")<{
    dailyPathDto: DailyPathDto;
  }>(),
  deleteDailyAsync: createAsyncAction(
    "@dailyDetail/DELETE_DAILY_DETAIL_REQUEST",
    "@dailyDetail/DELETE_DAILY_DETAIL_SUCCESS",
    "@dailyDetail/DELETE_DAILY_DETAIL_FAILURE",
  )<void, void, { statusCode: number }>()
};

export const { reset, fetchDaily, deleteDaily } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  daily: DailyDetailResponseDto;
  pending: boolean;
  rejected: boolean;
  statusCode: number;
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
  }));

export function* saga() {
  yield takeLeading(getType(fetchDaily), sagaFetchDaily);
  yield takeLeading(getType(deleteDaily), sagaDeleteDaily);
}

function* sagaFetchDaily(action: ActionType<typeof actions.fetchDaily>) {
  yield put(actions.fetchDailyAsync.request());
  try {
    const daily: DailyDetailResponseDto = yield call(dailyApi.find, action.payload.daily);
    yield put(actions.fetchDailyAsync.success({ daily }));
  } catch (e) {
    yield put(actions.fetchDailyAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.find.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}

function* sagaDeleteDaily(action: ActionType<typeof actions.deleteDaily>) {
  yield put(actions.deleteDailyAsync.request());
  try {
    yield call(dailyApi.delete, action.payload.dailyPathDto);
    yield put(actions.deleteDailyAsync.success());

    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.delete.fulfilled",
        variant: "success"
      }
    }));

    yield call(Router.push, Endpoints.daily);
  } catch (e) {
    yield put(actions.deleteDailyAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.delete.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}
