import { produce } from 'immer'
import { call, put, takeLatest } from "redux-saga/effects";
import { blogArticleFetcher, BlogArticleListResponseDto } from 'src/blog/api';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAsyncAction, createReducer, createStandardAction, getType } from "typesafe-actions";

const actions = {
  reset: createStandardAction("@blogArticleList/RESET")(),
  fetchBlogArticles: createStandardAction("@blogArticleList/FETCH_BLOG_ARTICLE_LIST")(),
  fetchBlogArticlesAsync: createAsyncAction(
    '@blogArticleList/FETCH_BLOG_ARTICLE_LIST_REQUEST',
    '@blogArticleList/FETCH_BLOG_ARTICLE_LIST_SUCCESS',
    '@blogArticleList/FETCH_BLOG_ARTICLE_LIST_FAILURE',
  )<void, { blogArticles: BlogArticleListResponseDto[] }, void>()
}

export const { reset, fetchBlogArticles } = actions;
export type Action = ActionType<typeof actions>

export interface State {
  blogArticles: BlogArticleListResponseDto[]
  pending: boolean
  rejected: boolean
}

// Initial State
const createInitialState = (): State => ({
  blogArticles: [],
  pending: true,
  rejected: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(actions.reset), createInitialState)
  .handleAction(getType(actions.fetchBlogArticlesAsync.request), (state) => produce<State, State>(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    return draft;
  }))
  .handleAction(getType(actions.fetchBlogArticlesAsync.success), (state, action) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.blogArticles = action.payload.blogArticles;
    return draft;
  }))
  .handleAction(getType(actions.fetchBlogArticlesAsync.failure), (state) => produce<State, State>(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(fetchBlogArticles), sagaFetchBlogArticle);
}

function* sagaFetchBlogArticle() {
  yield put(actions.fetchBlogArticlesAsync.request())
  try {
    const blogArticles: BlogArticleListResponseDto[] = yield call(blogArticleFetcher.findAll);
    yield put(actions.fetchBlogArticlesAsync.success({ blogArticles }));
  } catch (e) {
    yield put(actions.fetchBlogArticlesAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: 'noti:blogArticle.findAll.rejected',
        messageOptions: { e: stringify(e) },
        variant: 'error'
      }
    }))
  }
}