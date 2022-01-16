import {produce} from "immer";
import Router from "next/router";
import {call, put, select, takeLeading} from "redux-saga/effects";
import {dailyApi, DailyDetailResponseDto, DailyPathDto, DailyRequestDto} from "src/daily/api";
import {CreationResponse} from "src/common/api/dto/CreationResponse";
import {RootState} from "src/common/presentation/state-module/root";
import {enqueueSnackbar} from "src/common/presentation/state-module/snackbar";
import {getSeoulDateFrom} from "src/util";
import stringify from "src/util/stringify";
import {ActionType, createAction, createAsyncAction, createReducer, getType} from "typesafe-actions";

const actions = {
  reset: createAction("@dailyForm/RESET")(),

  fetchDaily: createAction("@dailyForm/FETCH_DAILY_DETAIL")<{
    dailyPathDto: DailyPathDto;
  }>(),
  fetchDailyAsync: createAsyncAction(
    "@dailyForm/FETCH_DAILY_DETAIL_REQUEST",
    "@dailyForm/FETCH_DAILY_DETAIL_SUCCESS",
    "@dailyForm/FETCH_DAILY_DETAIL_FAILURE",
  )<void, { daily: DailyDetailResponseDto }, { statusCode: number }>(),

  createDaily: createAction("@dailyForm/CREATE_DAILY_DETAIL")<{
    request: DailyRequestDto;
  }>(),
  createDailyAsync: createAsyncAction(
    "@dailyForm/CREATE_DAILY_DETAIL_REQUEST",
    "@dailyForm/CREATE_DAILY_DETAIL_SUCCESS",
    "@dailyForm/CREATE_DAILY_DETAIL_FAILURE",
  )<void, void, { statusCode: number }>(),

  updateDaily: createAction("@dailyForm/UPDATE_DAILY_DETAIL")<{
    request: DailyRequestDto;
  }>(),
  updateDailyAsync: createAsyncAction(
    "@dailyForm/UPDATE_DAILY_DETAIL_REQUEST",
    "@dailyForm/UPDATE_DAILY_DETAIL_SUCCESS",
    "@dailyForm/UPDATE_DAILY_DETAIL_FAILURE",
  )<void, void, { statusCode: number }>(),
};

export const { reset, fetchDaily, createDaily, updateDaily } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  initialValues: DailyDetailResponseDto;

  pending: boolean;
  rejected: boolean;
  statusCode: number;
}

const createInitialState = (): State => ({
  initialValues: {
    id: "",
    seq: 0,
    createdAt: "",
    updatedAt: "",
    title: "",
    slug: "",
    content: "",
  },

  pending: false,
  rejected: false,
  statusCode: 200
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.reset, createInitialState)
  .handleAction([
    actions.fetchDailyAsync.request,
    actions.createDailyAsync.request,
    actions.updateDailyAsync.request,
  ], (state) => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchDailyAsync.success, (state, action) => produce(state, draft => {
    draft.initialValues = action.payload.daily;

    draft.pending = false;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction([
    actions.createDailyAsync.success,
    actions.updateDailyAsync.success,
  ], (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction([
    actions.fetchDailyAsync.failure,
    actions.createDailyAsync.failure,
    actions.updateDailyAsync.failure
  ], (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }));

export function* saga() {
  yield takeLeading(getType(fetchDaily), sagaFetchDaily);
  yield takeLeading(getType(createDaily), sagaCreateDaily);
  yield takeLeading(getType(updateDaily), sagaUpdateDaily);
}

function* sagaFetchDaily(action: ActionType<typeof actions.fetchDaily>) {
  yield put(actions.fetchDailyAsync.request());
  try {
    const daily: DailyDetailResponseDto = yield call(dailyApi.find, action.payload.dailyPathDto);
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

function* sagaCreateDaily(action: ActionType<typeof actions.createDaily>) {
  yield put(actions.createDailyAsync.request());
  try {
    const creationResponse: CreationResponse = yield call(dailyApi.create, action.payload.request);
    yield put(actions.createDailyAsync.success());
    yield call(Router.push, "/daily/detail", creationResponse.id);

    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.create.fulfilled",
        variant: "success"
      }
    }));
  } catch (e) {
    yield put(actions.createDailyAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.create.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}

function* sagaUpdateDaily(action: ActionType<typeof actions.updateDaily>) {
  yield put(actions.updateDailyAsync.request());
  const { request } = action.payload;
  const initialValues: DailyDetailResponseDto = yield select((root: RootState) => root.daily.form.initialValues);
  const oldPath = getSeoulDateFrom(initialValues.createdAt).format("/YYYY/MM/DD/") + initialValues.slug;
  const newPath = getSeoulDateFrom(initialValues.createdAt).format("/YYYY/MM/DD/") + request.slug;

  try {
    yield call(dailyApi.update, request, oldPath);
    yield put(actions.updateDailyAsync.success());
    yield call(Router.push, "/daily/detail", `/daily${newPath}`);

    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.update.fulfilled",
        variant: "success"
      }
    }));
  } catch (e) {
    yield put(actions.updateDailyAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:daily.update.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}
