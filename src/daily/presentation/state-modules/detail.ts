import { produce } from "immer";
import { combineEpics, Epic, ofType } from "redux-observable";
import { concat, from, of } from "rxjs";
import { catchError, filter, map, switchMap, takeUntil } from "rxjs/operators";
import { DailyDetailRequestDto, DailyDetailResponseDto } from "src/daily/api";
import { dailyApi } from "src/daily/api/dailyApi";
import { ActionType, createAction, createAsyncAction, createReducer, isActionOf } from "typesafe-actions";

const actions = {
  reset: createAction("@dailyDetail/RESET")(),
  fetchDaily: createAction("@dailyDetail/FETCH_DAILY_DETAIL")<DailyDetailRequestDto>(),
  fetchDailyAsync: createAsyncAction(
    "@dailyDetail/FETCH_DAILY_DETAIL_REQUEST",
    "@dailyDetail/FETCH_DAILY_DETAIL_SUCCESS",
    "@dailyDetail/FETCH_DAILY_DETAIL_FAILURE",
    "@dailyDetail/FETCH_DAILY_DETAIL_CANCEL",
  )<void, DailyDetailResponseDto, { statusCode: number }, void>(),
};

export const { reset, fetchDaily } = actions;
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

const epicFetchDaily: Epic<Action, Action, State> = (action$, _$) => action$.pipe(
  filter(isActionOf(actions.fetchDaily)),
  switchMap(action => concat(
    of(actions.fetchDailyAsync.request()),
    from(dailyApi.find(action.payload)).pipe(
      map(daily => actions.fetchDailyAsync.success(daily)),
      catchError(err => ofType(actions.fetchDailyAsync.failure({ statusCode: err.status }))),
      takeUntil(action$.pipe(filter(isActionOf(actions.fetchDailyAsync.cancel)))),
    ))));

export const epic = combineEpics(epicFetchDaily);