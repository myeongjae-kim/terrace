import { produce } from 'immer'
import Router from 'next/router';
import { call, put, takeLatest } from "redux-saga/effects";
import { Endpoints } from 'src/common/constants/Constants';
import Id from 'src/common/domain/model/Id';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";
import NoticeFormDto from '../../api/dto/NoticeFormDto';
import NoticeRequestDto from '../../api/dto/NoticeRequestDto';
import Notice from "../../domain/model/Notice";
import { noticeService } from '../../infrastructure/service/NoticeServiceImpl';

export const reset = createAction("@noticeForm/RESET")();
export const setPendingFalse = createAction("@noticeForm/SET_PENDING_FALSE")();

export const fetchInitialNotice = createAction("@noticeForm/FETCH_INITIAL_NOTICE")<{ id: Id }>();
const fetchInitialNoticeAsync = createAsyncAction(
  '@noticeForm/FETCH_INITIAL_NOTICE_REQUEST',
  '@noticeForm/FETCH_INITIAL_NOTICE_SUCCESS',
  '@noticeForm/FETCH_INITIAL_NOTICE_FAILURE',
)<void, { initialNoticeFormDto: NoticeFormDto }, void>();

export const postNotice = createAction("@noticeForm/POST_NOTICE")<{ noticeFormDto: NoticeFormDto }>();
const postNoticeAsync = createAsyncAction(
  '@noticeForm/POST_NOTICE_REQUEST',
  '@noticeForm/POST_NOTICE_SUCCESS',
  '@noticeForm/POST_NOTICE_FAILURE',
)<void, void, void>();

export const putNotice = createAction("@noticeForm/PUT_NOTICE")<{ id: Id, noticeFormDto: NoticeFormDto }>();
const putNoticeAsync = createAsyncAction(
  '@noticeForm/PUT_NOTICE_REQUEST',
  '@noticeForm/PUT_NOTICE_SUCCESS',
  '@noticeForm/PUT_NOTICE_FAILURE',
)<void, void, void>();

export type Action = ActionType<
  typeof reset |
  typeof setPendingFalse |
  typeof fetchInitialNotice |
  typeof fetchInitialNoticeAsync.request |
  typeof fetchInitialNoticeAsync.success |
  typeof fetchInitialNoticeAsync.failure |
  typeof postNotice |
  typeof postNoticeAsync.request |
  typeof postNoticeAsync.success |
  typeof postNoticeAsync.failure |
  typeof putNotice |
  typeof putNoticeAsync.request |
  typeof putNoticeAsync.success |
  typeof putNoticeAsync.failure
>

export interface State {
  initialNoticeFormDto: NoticeFormDto
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = () => ({
  initialNoticeFormDto: NoticeFormDto.of({
    id: -1,
    title: "",
    content: ""
  }),
  pending: true,
  rejected: false
} as State);

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(reset, createInitialState)
  .handleAction(setPendingFalse, (state) => produce(state, draft => {
    draft.pending = false;
    return draft;
  }))
  .handleAction(fetchInitialNoticeAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(fetchInitialNoticeAsync.success, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.initialNoticeFormDto = action.payload.initialNoticeFormDto;
    return draft;
  }))
  .handleAction(fetchInitialNoticeAsync.failure, (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))
  .handleAction(postNoticeAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(postNoticeAsync.success, (state) => produce(state, draft => {
    draft.pending = false;
    return draft;
  }))
  .handleAction(postNoticeAsync.failure, (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))
  .handleAction(putNoticeAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    return draft;
  }))
  .handleAction(putNoticeAsync.success, (state) => produce(state, draft => {
    draft.pending = false;
    return draft;
  }))
  .handleAction(putNoticeAsync.failure, (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchInitialNotice), sagaFetchInitialNotice);
  yield takeLatest(getType(postNotice), sagaPostNotice);
  yield takeLatest(getType(putNotice), sagaPutNotice);
}

function* sagaFetchInitialNotice(action: ActionType<typeof fetchInitialNotice>) {
  yield put(fetchInitialNoticeAsync.request())
  const { id } = action.payload
  try {
    const notice: Notice = yield call(noticeService.getNotice, id);
    const initialNoticeFormDto = yield call(NoticeFormDto.of, notice);
    yield put(fetchInitialNoticeAsync.success({ initialNoticeFormDto }));
  } catch (e) {
    yield put(fetchInitialNoticeAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.get.rejected',
        variant: 'error'
      }
    }))
  }
}

const PATH = Endpoints["mother.notice"];

function* sagaPostNotice(action: ActionType<typeof postNotice>) {
  yield put(postNoticeAsync.request())
  const { noticeFormDto } = action.payload;
  try {
    const noticeRequestDto = NoticeRequestDto.of(noticeFormDto);
    const id: Id = yield call(noticeService.postNotice, noticeRequestDto);

    yield put(postNoticeAsync.success());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.add.fulfilled',
        variant: 'success'
      }
    }))

    Router.push(`${PATH}/detail?id=${id}`, `${PATH}${id}`)
  } catch (e) {
    yield put(postNoticeAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.add.rejected',
        variant: 'error'
      }
    }))
  }
}

function* sagaPutNotice(action: ActionType<typeof putNotice>): Generator {
  yield put(postNoticeAsync.request())
  const { id, noticeFormDto } = action.payload;
  try {
    const noticeRequestDto = NoticeRequestDto.of(noticeFormDto);
    yield call(noticeService.putNotice, id, noticeRequestDto);

    yield put(postNoticeAsync.success());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.edit.fulfilled',
        variant: 'success'
      }
    }))

    Router.push(`${PATH}/detail?id=${id}`, `${PATH}/${id}`)
  } catch (e) {
    yield put(postNoticeAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:mother.notice.edit.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}