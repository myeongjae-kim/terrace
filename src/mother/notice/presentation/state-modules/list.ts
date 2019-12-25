import { produce } from 'immer'
import { call, put, takeLatest } from "redux-saga/effects";
import Page from 'src/common/domain/model/Page';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";
import Notice from "../../domain/model/Notice";
import { noticeService } from '../../infrastructure/service/NoticeServiceImpl';

export const reset = createStandardAction("@noticeList/RESET")();

export const fetchNoticePage = createStandardAction("@noticeList/FETCH_NOTICE_PAGE")();
const fetchNoticePageAsync = createAsyncAction(
  '@noticeList/FETCH_NOTICE_PAGE_REQUEST',
  '@noticeList/FETCH_NOTICE_PAGE_SUCCESS',
  '@noticeList/FETCH_NOTICE_PAGE_FAILURE',
)<void, { page: Page<Notice> }, void>();

export type Action = ActionType<
  typeof reset |
  typeof fetchNoticePage |
  typeof fetchNoticePageAsync.request |
  typeof fetchNoticePageAsync.success |
  typeof fetchNoticePageAsync.failure
>

export interface State {
  page: Page<Notice>
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
  page: { content: [] as Notice[] },
  pending: true,
  rejected: false
} as State);

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(reset), createInitialState)
  .handleAction(getType(fetchNoticePageAsync.request), (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(getType(fetchNoticePageAsync.success), (state, action) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.page = action.payload.page;
    return draft;
  }))
  .handleAction(getType(fetchNoticePageAsync.failure), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchNoticePage), sagaFetchNotice);
}

function* sagaFetchNotice() {
  yield put(fetchNoticePageAsync.request())
  try {
    const page: Page<Notice> = yield call(noticeService.getNoticePage, { page: 1, size: 1 << 31 - 1 });
    yield put(fetchNoticePageAsync.success({ page }));
  } catch (e) {
    yield put(fetchNoticePageAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.get.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}