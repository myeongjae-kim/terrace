import { produce } from 'immer';
import { call, put, takeLatest } from "redux-saga/effects";
import { blogArticleApi, BlogArticleRequestDto } from 'src/blog/api';
import { CreationResponse } from 'src/common/api/dto/CreationResponse';
import { enqueueSnackbar } from 'src/common/presentation/state-module/snackbar';
import stringify from 'src/util/stringify';
import { ActionType, createAction, createAsyncAction, createReducer, getType } from "typesafe-actions";

const actions = {
  reset: createAction("@blogArticleForm/RESET")(),
  createBlogArticle: createAction("@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL")<{
    request: BlogArticleRequestDto
  }>(),
  createBlogArticleAsync: createAsyncAction(
    '@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_REQUEST',
    '@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_SUCCESS',
    '@blogArticleForm/CREATE_BLOG_ARTICLE_DETAIL_FAILURE',
  )<void, void, { statusCode: number }>()
}

export const { reset, createBlogArticle } = actions;
export type Action = ActionType<typeof actions>;

export interface State {
  pending: boolean
  rejected: boolean
  statusCode: number
}

const createInitialState = (): State => ({
  pending: false,
  rejected: false,
  statusCode: 200
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(actions.reset, createInitialState)
  .handleAction(actions.createBlogArticleAsync.request, (state) => produce(state, draft => {
    draft.pending = true;
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
  .handleAction(actions.createBlogArticleAsync.failure, (state, action) => produce(state, draft => {
    draft.pending = false;
    draft.rejected = true;
    draft.statusCode = action.payload.statusCode;
    return draft;
  }))

export function* saga() {
  yield takeLatest(getType(createBlogArticle), sagaCreateBlogArticle);
}

function* sagaCreateBlogArticle(action: ActionType<typeof actions.createBlogArticle>) {
  yield put(actions.createBlogArticleAsync.request())
  try {
    const creationResponse: CreationResponse = yield call(blogArticleApi.create, action.payload.request);
    yield put(actions.createBlogArticleAsync.success());
    console.log(creationResponse);
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