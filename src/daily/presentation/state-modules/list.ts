import { produce } from "immer";
import { combineEpics, Epic, ofType } from "redux-observable";
import { concat, from, of } from "rxjs";
import { catchError, filter, map, switchMap, takeUntil } from "rxjs/operators";
import { DailyListResponseDto } from "src/daily/api";
import { dailyApi } from "src/daily/api/dailyApi";
import { ActionType, createAction, createAsyncAction, createReducer, isActionOf } from "typesafe-actions";

const actions = {
  reset: createAction("@dailyList/RESET")(),
  fetchDailys: createAction("@dailyList/FETCH_DAILY_LIST")(),
  fetchDailysAsync: createAsyncAction(
    "@dailyList/FETCH_DAILY_LIST_REQUEST",
    "@dailyList/FETCH_DAILY_LIST_SUCCESS",
    "@dailyList/FETCH_DAILY_LIST_FAILURE",
    "@dailyList/FETCH_DAILY_LIST_CANCEL",
  )<void, DailyListResponseDto[], {statusCode: number}, void>()
};

export const { reset, fetchDailys } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  dailys: DailyListResponseDto[];
  pending: boolean;
  rejected: boolean;
  statusCode: number;
}

// Initial State
const createInitialState = (): State => ({
  dailys: [],
  pending: true,
  rejected: false,
  statusCode: 0,
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
    draft.dailys = action.payload;
    return draft;
  }))
  .handleAction(actions.fetchDailysAsync.failure, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }));

const epicFetchDailys: Epic<Action, Action, State> = (action$, _$) => action$.pipe(
  filter(isActionOf(actions.fetchDailys)),
  switchMap(() => concat(
    of(actions.fetchDailysAsync.request()),
    from(dailyApi.findAll()).pipe(
      map(daily => actions.fetchDailysAsync.success(daily)),
      catchError(err => ofType(actions.fetchDailysAsync.failure({ statusCode: err.status }))),
      takeUntil(action$.pipe(filter(isActionOf(actions.fetchDailysAsync.cancel)))),
    ))));

export const epic = combineEpics(epicFetchDailys);