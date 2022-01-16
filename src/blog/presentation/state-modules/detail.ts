import { produce } from "immer";
import Router from "next/router";
import { call, put, takeLeading } from "redux-saga/effects";
import {blogArticleApi, BlogArticleDetailResponseDto, BlogArticlePathDto, BlogArticlePrevOrNext} from "src/blog/api";
import { Endpoints } from "src/common/constants/Constants";
import { enqueueSnackbar } from "src/common/presentation/state-module/snackbar";
import stringify from "src/util/stringify";
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  reset: createAction("@blogArticleDetail/RESET")(),

  fetchBlogArticle: createAction("@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL")<{
    blogArticlePathDto: BlogArticlePathDto;
  }>(),
  fetchPrev: createAction("@blogArticleDetail/FETCH_BLOG_ARTICLE_PREV")<{
    seq: number;
  }>(),
  fetchNext: createAction("@blogArticleDetail/FETCH_BLOG_ARTICLE_NEXT")<{
    seq: number;
  }>(),

  fetchBlogArticleAsync: createAsyncAction(
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL_REQUEST",
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL_SUCCESS",
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL_FAILURE",
  )<void, { blog: BlogArticleDetailResponseDto }, { statusCode: number }>(),

  fetchPrevAsync: createAsyncAction(
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_PREV_REQUEST",
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_PREV_SUCCESS",
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_PREV_FAILURE",
  )<void, { prev: BlogArticlePrevOrNext }, { statusCode: number }>(),

  fetchNextAsync: createAsyncAction(
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_NEXT_REQUEST",
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_NEXT_SUCCESS",
    "@blogArticleDetail/FETCH_BLOG_ARTICLE_NEXT_FAILURE",
  )<void, { next: BlogArticlePrevOrNext }, { statusCode: number }>(),

  deleteBlogArticle: createAction("@blogArticleDetail/DELETE_BLOG_ARTICLE_DETAIL")<{
    blogArticlePathDto: BlogArticlePathDto;
  }>(),
  deleteBlogArticleAsync: createAsyncAction(
    "@blogArticleDetail/DELETE_BLOG_ARTICLE_DETAIL_REQUEST",
    "@blogArticleDetail/DELETE_BLOG_ARTICLE_DETAIL_SUCCESS",
    "@blogArticleDetail/DELETE_BLOG_ARTICLE_DETAIL_FAILURE",
  )<void, void, { statusCode: number }>()
};

export const { reset, fetchBlogArticle, fetchPrev, fetchNext, deleteBlogArticle } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  blogArticle: BlogArticleDetailResponseDto;
  pending: boolean;
  rejected: boolean;
  statusCode: number;
}

const createInitialState = (): State => ({
  blogArticle: {
    id: "",
    seq: -1,
    createdAt: "",
    updatedAt: "",
    title: "",
    slug: "",
    content: "",
    prev: {
      id: "",
      createdAt: "",
      title: "",
      uri: ""
    },
    next: {
      id: "",
      createdAt: "",
      title: "",
      uri: ""
    },
  },
  pending: true,
  rejected: false,
  statusCode: 200
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.reset, createInitialState)
  .handleAction([
    actions.fetchBlogArticleAsync.request,
    actions.deleteBlogArticleAsync.request,
  ], (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchBlogArticleAsync.success, (state, action) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.blogArticle = action.payload.blog;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.deleteBlogArticleAsync.success, (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchPrevAsync.success, (state, action) => produce<State, State>(state, draft => {
    draft.blogArticle.prev = action.payload.prev;
    return draft;
  }))
  .handleAction(actions.fetchNextAsync.success, (state, action) => produce<State, State>(state, draft => {
    draft.blogArticle.next = action.payload.next;
    return draft;
  }))
  .handleAction([
    actions.fetchBlogArticleAsync.failure,
    actions.deleteBlogArticleAsync.failure
  ], (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }));

export function* saga() {
  yield takeLeading(getType(fetchBlogArticle), sagaFetchBlogArticle);
  yield takeLeading(getType(actions.fetchPrev), sagaFetchPrev);
  yield takeLeading(getType(actions.fetchNext), sagaFetchNext);
  yield takeLeading(getType(deleteBlogArticle), sagaDeleteBlogArticle);
}

function* sagaFetchBlogArticle(action: ActionType<typeof actions.fetchBlogArticle>) {
  yield put(actions.fetchBlogArticleAsync.request());
  try {
    const blog: BlogArticleDetailResponseDto = yield call(blogArticleApi.find, action.payload.blogArticlePathDto);
    yield put(actions.fetchBlogArticleAsync.success({ blog }));

    yield put(actions.fetchPrev({seq: blog.seq}));
    yield put(actions.fetchNext({seq: blog.seq}));
  } catch (e) {
    yield put(actions.fetchBlogArticleAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.find.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}

function* sagaFetchPrev(action: ActionType<typeof actions.fetchPrev>) {
  yield put(actions.fetchPrevAsync.request());
  try {
    const prev: BlogArticlePrevOrNext = yield call(blogArticleApi.getPrevOf, action.payload.seq);
    yield put(actions.fetchPrevAsync.success({ prev }));
  } catch (e) {
    yield put(actions.fetchPrevAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.prev.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}

function* sagaFetchNext(action: ActionType<typeof actions.fetchNext>) {
  yield put(actions.fetchNextAsync.request());
  try {
    const next: BlogArticlePrevOrNext = yield call(blogArticleApi.getNextOf, action.payload.seq);
    yield put(actions.fetchNextAsync.success({ next }));
  } catch (e) {
    yield put(actions.fetchNextAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.prev.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}

function* sagaDeleteBlogArticle(action: ActionType<typeof actions.deleteBlogArticle>) {
  yield put(actions.deleteBlogArticleAsync.request());
  try {
    yield call(blogArticleApi.delete, action.payload.blogArticlePathDto);
    yield put(actions.deleteBlogArticleAsync.success());

    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.delete.fulfilled",
        variant: "success"
      }
    }));

    yield call(Router.push, Endpoints.blog);
  } catch (e) {
    yield put(actions.deleteBlogArticleAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.delete.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}
