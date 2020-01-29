import { produce } from 'immer';
import Router from 'next/router';
import { call, put, takeLatest } from "redux-saga/effects";
import { blogArticleApi, BlogArticleDetailResponseDto, BlogArticlePathDto, BlogArticleRequestDto } from 'src/blog/api';
import { CreationResponse } from 'src/common/api/dto/CreationResponse';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  reset: createAction("@blogArticleForm/RESET")(),

  fetchBlogArticle: createAction("@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL")<{
    blogArticle: BlogArticlePathDto
  }>(),
  fetchBlogArticleAsync: createAsyncAction(
    '@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL_REQUEST',
    '@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL_SUCCESS',
    '@blogArticleForm/FETCH_BLOG_ARTICLE_DETAIL_FAILURE',
  )<void, { blog: BlogArticleDetailResponseDto }, { statusCode: number }>(),

  createBlogArticle: createAction("@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL")<{
    request: BlogArticleRequestDto
  }>(),
  createBlogArticleAsync: createAsyncAction(
    '@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_REQUEST',
    '@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_SUCCESS',
    '@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_FAILURE',
  )<void, void, { statusCode: number }>(),
}

export const { reset, createBlogArticle, fetchBlogArticle } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  initialValues: BlogArticleDetailResponseDto

  pending: boolean
  rejected: boolean
  statusCode: number
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
  .handleAction(actions.createBlogArticleAsync.success, (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction([
    actions.fetchBlogArticleAsync.failure,
    actions.createBlogArticleAsync.failure
  ], (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchBlogArticle), sagaFetchBlogArticle);
  yield takeLatest(getType(createBlogArticle), sagaCreateBlogArticle);
}

function* sagaFetchBlogArticle(action: ActionType<typeof actions.fetchBlogArticle>) {
  yield put(actions.fetchBlogArticleAsync.request())
  try {
    const blog: BlogArticleDetailResponseDto = yield call(blogArticleApi.find, action.payload.blogArticle);
    yield put(actions.fetchBlogArticleAsync.success({ blog }));
  } catch (e) {
    yield put(actions.fetchBlogArticleAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:blogArticle.find.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}

function* sagaCreateBlogArticle(action: ActionType<typeof actions.createBlogArticle>) {
  yield put(actions.createBlogArticleAsync.request())
  try {
    const creationResponse: CreationResponse = yield call(blogArticleApi.create, action.payload.request);
    yield put(actions.createBlogArticleAsync.success());
    Router.push("/blog/detail", creationResponse.id)

    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:blogArticle.create.fulfilled',
        variant: 'success'
      }
    }))
  } catch (e) {
    yield put(actions.createBlogArticleAsync.failure({ statusCode: e.status }));
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:blogArticle.create.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}