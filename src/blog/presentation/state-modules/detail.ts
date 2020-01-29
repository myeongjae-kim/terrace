import { produce } from 'immer';
import { call, put, takeLatest } from "redux-saga/effects";
import { blogArticleApi, BlogArticleDetailResponseDto, BlogArticlePathDto } from 'src/blog/api';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  reset: createAction("@blogArticleDetail/RESET")(),
  fetchBlogArticle: createAction("@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL")<{
    blogArticle: BlogArticlePathDto
  }>(),
  fetchBlogArticleAsync: createAsyncAction(
    '@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL_REQUEST',
    '@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL_SUCCESS',
    '@blogArticleDetail/FETCH_BLOG_ARTICLE_DETAIL_FAILURE',
  )<void, { blog: BlogArticleDetailResponseDto }, { statusCode: number }>()
}

export const { reset, fetchBlogArticle } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  blogArticle: BlogArticleDetailResponseDto
  pending: boolean
  rejected: boolean
  statusCode: number
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
  .handleAction(actions.fetchBlogArticleAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchBlogArticleAsync.success, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.blogArticle = action.payload.blog;
    draft.statusCode = 200;
    return draft;
  }))
  .handleAction(actions.fetchBlogArticleAsync.failure, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchBlogArticle), sagaFetchBlogArticle);
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