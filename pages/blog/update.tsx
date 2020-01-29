import { NextPageContext } from 'next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Store } from 'redux';
import { createSelector } from 'reselect';
import { BlogArticleDetailResponseDto, BlogArticlePathDto, BlogArticleRequestDto } from 'src/blog/api';
import { BlogArticleForm } from 'src/blog/presentation/components/templates';
import * as formModule from 'src/blog/presentation/state-modules/form';
import NextPage from 'src/common/domain/model/NextPage';
import { RootState } from 'src/common/presentation/state-module/root';
import { redirectFromGetInitialPropsTo } from 'src/util';

const selector = createSelector<RootState, formModule.State, {
  initialValues: BlogArticleDetailResponseDto
  pending: boolean
  rejected: boolean
}>(
  root => root.blog.form,
  ({ initialValues, pending, rejected }) => ({ initialValues, pending, rejected })
)

const BlogArticleUpdatePage: NextPage = () => {
  const dispatch = useDispatch<Dispatch<formModule.Action>>();
  const props = useSelector(selector);

  const onSubmit = React.useCallback((request: BlogArticleRequestDto) => {
    dispatch(formModule.createBlogArticle({ request }))
    return Promise.resolve();
  }, [])

  return <div>
    <BlogArticleForm onSubmit={onSubmit} isUpdating {...props} />
  </div>
}

BlogArticleUpdatePage.getInitialProps = async ({ store, asPath, res }: { store: Store<RootState> } & NextPageContext) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {}
  }

  fetchBlogArticleDetail(store, parsePathToBlogArticleDetailRequest(asPath));

  return { namespacesRequired: ['common', 'noti'] }
}

const fetchBlogArticleDetail = (store: Store<RootState>, req: BlogArticlePathDto): void => {
  store.dispatch(formModule.fetchBlogArticle({ blogArticle: req }))
}

const parsePathToBlogArticleDetailRequest = (asPath: string): BlogArticlePathDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[3],
    month: splitted[4],
    day: splitted[5],
    slug: splitted[6],
  }
}

export default BlogArticleUpdatePage;