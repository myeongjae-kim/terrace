import { produce } from 'immer';
import Router from 'next/router';
import { call, put, takeLatest } from "redux-saga/effects";
import { Endpoints } from 'src/common/constants/Constants';
import Id from 'src/common/domain/model/Id';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";
import Notice from "../../domain/model/Notice";
import { noticeService } from '../../infrastructure/service/NoticeServiceImpl';

export const reset = createStandardAction("@noticeDetail/RESET")();

export const fetchNotice = createStandardAction("@noticeDetail/FETCH_NOTICE")<{ id: Id }>();
const fetchNoticeAsync = createAsyncAction(
  '@noticeDetail/FETCH_NOTICE_REQUEST',
  '@noticeDetail/FETCH_NOTICE_SUCCESS',
  '@noticeDetail/FETCH_NOTICE_FAILURE',
)<void, { notice: Notice }, void>();

export const deleteNotice = createStandardAction("@noticeDetail/DELETE_NOTICE")<{ id: Id }>();
const deleteNoticeAsync = createAsyncAction(
  '@noticeDetail/DELETE_NOTICE_REQUEST',
  '@noticeDetail/DELETE_NOTICE_SUCCESS',
  '@noticeDetail/DELETE_NOTICE_FAILURE',
)<void, void, void>();

export type Action = ActionType<
  typeof reset |
  typeof fetchNotice |
  typeof fetchNoticeAsync.request |
  typeof fetchNoticeAsync.success |
  typeof fetchNoticeAsync.failure |
  typeof deleteNoticeAsync.request |
  typeof deleteNoticeAsync.success |
  typeof deleteNoticeAsync.failure
>

export interface State {
  notice: Notice
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
  notice: {
    id: -1,
    title: "",
    content: ""
  } as Notice,
  pending: true,
  rejected: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset), createInitialState)
  .handleAction(getType(fetchNoticeAsync.request), (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(getType(fetchNoticeAsync.success), (state, action) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.notice = action.payload.notice;
    return draft;
  }))
  .handleAction(getType(fetchNoticeAsync.failure), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))
  .handleAction(getType(deleteNoticeAsync.request), (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(getType(deleteNoticeAsync.success), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    return draft;
  }))
  .handleAction(getType(deleteNoticeAsync.failure), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchNotice), sagaFetchNotice);
  yield takeLatest(getType(deleteNotice), sagaDeleteNotice);
}

const PATH = Endpoints["mother.notice"];

function* sagaFetchNotice(action: ActionType<typeof fetchNotice>) {
  yield put(fetchNoticeAsync.request())
  const { id } = action.payload
  try {
    const notice: Notice = yield call(noticeService.getNotice, id);
    yield put(fetchNoticeAsync.success({ notice }));
  } catch (e) {
    yield put(fetchNoticeAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.get.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}

function* sagaDeleteNotice(action: ActionType<typeof deleteNotice>): Generator {
  yield put(deleteNoticeAsync.request())
  const { id } = action.payload
  try {
    yield call(noticeService.deleteNotice, id);
    yield put(deleteNoticeAsync.success());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.delete.fulfilled',
        variant: 'success'
      }
    }))

    Router.push(`${PATH}/index`, PATH);
  } catch (e) {
    yield put(deleteNoticeAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.delete.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}