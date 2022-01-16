import { produce } from "immer";
import { call, put, takeLeading } from "redux-saga/effects";
import { blogArticleApi, BlogArticleListResponseDto } from "src/blog/api";
import { enqueueSnackbar } from "src/common/presentation/state-module/snackbar";
import stringify from "src/util/stringify";
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";
import {StrapiResponse} from "src/common/api/dto/StrapiResponse";
import {StrapiPagination, strapiPaginationDefault} from "src/common/domain/model/StrapiPagination";

const actions = {
  reset: createAction("@blogArticleList/RESET")(),
  fetchBlogArticles: createAction("@blogArticleList/FETCH_BLOG_ARTICLE_LIST")<{page: number}>(),
  fetchBlogArticlesAsync: createAsyncAction(
    "@blogArticleList/FETCH_BLOG_ARTICLE_LIST_REQUEST",
    "@blogArticleList/FETCH_BLOG_ARTICLE_LIST_SUCCESS",
    "@blogArticleList/FETCH_BLOG_ARTICLE_LIST_FAILURE",
  )<void, { blogArticles: BlogArticleListResponseDto[], pagination: StrapiPagination }, void>()
};

export const { reset, fetchBlogArticles } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  blogArticles: BlogArticleListResponseDto[];
  pagination: StrapiPagination,
  pending: boolean;
  rejected: boolean;
}

// Initial State
const createInitialState = (): State => ({
  blogArticles: [],
  pagination: strapiPaginationDefault,
  pending: true,
  rejected: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.reset, createInitialState)
  .handleAction(actions.fetchBlogArticlesAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
    draft.rejected = false;
    return draft;
  }))
  .handleAction(actions.fetchBlogArticlesAsync.success, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = false;
    draft.blogArticles = action.payload.blogArticles;
    draft.pagination = action.payload.pagination;
    return draft;
  }))
  .handleAction(actions.fetchBlogArticlesAsync.failure, (state) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    return draft;
  }));

export function* saga() {
  yield takeLeading(getType(fetchBlogArticles), sagaFetchBlogArticle);
}

function* sagaFetchBlogArticle(action: ActionType<typeof actions.fetchBlogArticles>) {
  yield put(actions.fetchBlogArticlesAsync.request());
  try {
    const {data, meta}: StrapiResponse<BlogArticleListResponseDto> = yield call(blogArticleApi.findAll, action.payload.page);
    yield put(actions.fetchBlogArticlesAsync.success({ blogArticles: data, pagination: meta.pagination }));
  } catch (e) {
    yield put(actions.fetchBlogArticlesAsync.failure());
    yield put(enqueueSnackbar({
      snackbar: {
        message: "noti:blogArticle.findAll.rejected",
        messageOptions: { e: stringify(e) },
        variant: "error"
      }
    }));
  }
}
