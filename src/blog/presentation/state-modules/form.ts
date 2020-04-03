import { produce } from "immer";
import Router from "next/router";
import { call, put, select, takeLeading } from "redux-saga/effects";
import { blogArticleApi, BlogArticleDetailResponseDto, BlogArticlePathDto, BlogArticleRequestDto } from "src/blog/api";
import { CreationResponse } from "src/common/api/dto/CreationResponse";
import { RootState } from "src/common/presentation/state-module/root";
import { enqueueSnackbar } from "src/common/presentation/state-module/snackbar";
import { getSeoulDateFrom } from "src/util";
import stringify from "src/util/stringify";
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  reset: createAction("@blogArticleForm/RESET")(),

  fetchBlogArticle: createAction("@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL")<{
    blogArticlePathDto: BlogArticlePathDto;
  }>(),
  fetchBlogArticleAsync: createAsyncAction(
    "@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL_REQUEST",
    "@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL_SUCCESS",
    "@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL_FAILURE",
  )<void, { blog: BlogArticleDetailResponseDto }, { statusCode: number }>(),

  createBlogArticle: createAction("@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL")<{
    request: BlogArticleRequestDto;
  }>(),
  createBlogArticleAsync: createAsyncAction(
    "@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_REQUEST",
    "@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_SUCCESS",
    "@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_FAILURE",
  )<void, void, { statusCode: number }>(),

  updateBlogArticle: createAction("@blogArticleForm/UPDATE_BLOG_ARTICLE_DETAIL")<{
    request: BlogArticleRequestDto;
  }>(),
  updateBlogArticleAsync: createAsyncAction(
    "@blogArticleForm/UPDATE_BLOG_ARTICLE_DETAIL_REQUEST",
    "@blogArticleForm/UPDATE_BLOG_ARTICLE_DETAIL_SUCCESS",
    "@blogArticleForm/UPDATE_BLOG_ARTICLE_DETAIL_FAILURE",
  )<void, void, { statusCode: number }>(),
};

export const { reset, fetchBlogArticle, createBlogArticle, updateBlogArticle } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  initialValues: BlogArticleDetailResponseDto;

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
    prev: {
      id: "",
      createdAt: "",
      title: "",
      uri: "",
    },
    next: {
      id: "",
      createdAt: "",
      title: "",
      uri: "",
    }
  },

  pending: false,
  rejected: false,
  statusCode: 200
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.reset, createInitialState)
  .handleAction([
    actions.fetchBlogArticleAsync.request,
    actions.createBlogArticleAsync.request,
    actions.updateBlogArticleAsync.request,
  ], (state) => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchBlogArticleAsync.success, (state, action) => produce(state, draft => {
    draft.initialValues = action.payload.blog;

    draft.pending = false;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction([
    actions.createBlogArticleAsync.success,
    actions.updateBlogArticleAsync.success,
  ], (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction([
    actions.fetchBlogArticleAsync.failure,
    actions.createBlogArticleAsync.failure,
    actions.updateBlogArticleAsync.failure
  ], (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }));

export function* saga() {
  yield takeLeading(getType(fetchBlogArticle), sagaFetchBlogArticle);
  yield takeLeading(getType(createBlogArticle), sagaCreateBlogArticle);
  yield takeLeading(getType(updateBlogArticle), sagaUpdateBlogArticle);
}

function* sagaFetchBlogArticle(action: ActionType<typeof actions.fetchBlogArticle>) {
  yield put(actions.fetchBlogArticleAsync.request());
  try {
    const blog: BlogArticleDetailResponseDto = yield call(blogArticleApi.find, action.payload.blogArticlePathDto);
    yield put(actions.fetchBlogArticleAsync.success({ blog }));
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

function* sagaCreateBlogArticle(action: ActionType<typeof actions.createBlogArticle>) {
  yield put(actions.createBlogArticleAsync.request());
  try {
    const creationResponse: CreationResponse = yield call(blogArticleApi.create, action.payload.request);
    yield put(actions.createBlogArticleAsync.success());
    yield call(Router.push, "/blog/detail", creationResponse.id);

    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.create.fulfilled",
        variant: "success"
      }
    }));
  } catch (e) {
    yield put(actions.createBlogArticleAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.create.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}

function* sagaUpdateBlogArticle(action: ActionType<typeof actions.updateBlogArticle>) {
  yield put(actions.updateBlogArticleAsync.request());
  const { request } = action.payload;
  const initialValues: BlogArticleDetailResponseDto = yield select((root: RootState) => root.blog.form.initialValues);
  const oldPath = getSeoulDateFrom(initialValues.createdAt).format("/YYYY/MM/DD/") + initialValues.slug;
  const newPath = getSeoulDateFrom(initialValues.createdAt).format("/YYYY/MM/DD/") + request.slug;

  try {
    yield call(blogArticleApi.update, request, oldPath);
    yield put(actions.updateBlogArticleAsync.success());
    yield call(Router.push, "/blog/detail", `/blog${newPath}`);

    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.update.fulfilled",
        variant: "success"
      }
    }));
  } catch (e) {
    yield put(actions.updateBlogArticleAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.update.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}