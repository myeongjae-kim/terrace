import { produce } from "immer";
import { combineEpics, Epic, ofType } from "redux-observable";
import { call, put, takeLeading } from "redux-saga/effects";
import { from } from "rxjs";
import { catchError, filter, map, switchMap, takeUntil } from "rxjs/operators";
import { enqueueSnackbar } from "src/common/presentation/state-module/snackbar";
import { DailyDetailRequestDto, DailyDetailResponseDto, dailyFetcher } from "src/daily/api";
import { dailyApi } from "src/daily/api/dailyApi";
import stringify from "src/util/stringify";
import { ActionType, createAction, createAsyncAction, createReducer, getType, isActionOf } from "typesafe-actions";

const actions = {
  reset: createAction("@dailyDetail/RESET")(),
  fetchDaily: createAction("@dailyDetail/FETCH_DAILY_DETAIL")<{
    daily: DailyDetailRequestDto;
  }>(),
  fetchDailyAsync: createAsyncAction(
    "@dailyDetail/FETCH_DAILY_DETAIL_REQUEST",
    "@dailyDetail/FETCH_DAILY_DETAIL_SUCCESS",
    "@dailyDetail/FETCH_DAILY_DETAIL_FAILURE",
    "@dailyDetail/FETCH_DAILY_DETAIL_CANCEL",
  )<void, DailyDetailResponseDto, { statusCode: number }, void>(),

  fetchDailyRx: createAction("@dailyDetail/FETCH_DAILY_DETAIL_RX")<{
    daily: DailyDetailRequestDto;
  }>(),
};

export const { reset, fetchDaily, fetchDailyRx } = actions;
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
    draft.daily = action.payload;
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
}

function* sagaFetchDaily(action: ActionType<typeof actions.fetchDaily>) {
  yield put(actions.fetchDailyAsync.request());
  try {
    const daily: DailyDetailResponseDto = yield call(dailyFetcher.find, action.payload.daily);
    yield put(actions.fetchDailyAsync.success(daily));
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

const epicFetchDaily: Epic<Action, Action, State> = (action$, _$) => action$.pipe(
  filter(isActionOf(actions.fetchDailyRx)),
  switchMap(action => from(dailyApi.find(action.payload.daily)).pipe(
    map(daily => actions.fetchDailyAsync.success(daily)),
    catchError(err => ofType(actions.fetchDailyAsync.failure({ statusCode: err.status }))),
    takeUntil(action$.pipe(filter(isActionOf(actions.fetchDailyAsync.cancel)))))));

export const epic = combineEpics(epicFetchDaily);