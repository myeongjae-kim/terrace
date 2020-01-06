import { NextPageContext } from 'next';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'redux';
import BlogArticleList from 'src/blog/presentation/components/templates/BlogArticleList';
import { BlogArticleListProps } from 'src/blog/presentation/components/templates/BlogArticleList/BlogArticleList';
import * as listModule from "src/blog/presentation/state-modules/list"
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { PageTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';

const BlogArticlePage: NextPage = () => {
  const props = useSelector<RootState, BlogArticleListProps>(({ blog }) => blog.list);

  return <>
    <HeadTitle title="Blog" />
    <PageTitle title="articles" />
    <BlogArticleList {...props} />
  </>
}

BlogArticlePage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().blog.list.blogArticles.length === 0) {
    store.dispatch(listModule.fetchBlogArticles())
  }

  return { namespacesRequired: ['common', 'noti'] }
}

export default BlogArticlePage;