import { NextPageContext } from 'next';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import { createSelector } from 'reselect';
import * as meModule from "src/auth/presentation/state-modules/me"
import BlogArticleList from 'src/blog/presentation/components/templates/BlogArticleList';
import { BlogArticleListProps } from 'src/blog/presentation/components/templates/BlogArticleList/BlogArticleList';
import * as listModule from "src/blog/presentation/state-modules/list"
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle, PageTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';

const selector = createSelector<RootState, listModule.State, meModule.State, BlogArticleListProps>(
  root => root.blog.list,
  root => root.auth.me,
  (list, me) => ({ ...list, isSignedIn: me.isSignedIn })
);

const BlogArticlePage: NextPage = () => {
  const props = useSelector<RootState, BlogArticleListProps>(selector);

  return <div>
    <HeadTitle title="Blog" />
    <PageTitle title="articles" />
    <BlogArticleList {...props} />
  </div>
}

BlogArticlePage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  store.dispatch(listModule.fetchBlogArticles())

  return { namespacesRequired: ['common', 'noti'] }
}

export default BlogArticlePage;