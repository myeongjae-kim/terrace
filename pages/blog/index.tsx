import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { BlogArticleListResponseDto } from 'src/blog/api';
import BlogArticleList from 'src/blog/presentation/components/templates/BlogArticleList';
import * as listModule from "src/blog/presentation/state-modules/list"
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { PageTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';

interface Props {
  blogArticles: BlogArticleListResponseDto[]
  pending: boolean
  rejected: boolean
}

const BlogArticlePage: NextPage<Props> = ({ blogArticles, pending, rejected }) => <>
  <HeadTitle title="Blog" />
  <PageTitle title="articles" />
  <BlogArticleList blogArticles={blogArticles} pending={pending} rejected={rejected} />
</>

BlogArticlePage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().blog.list.blogArticles.length === 0) {
    store.dispatch(listModule.fetchBlogArticles())
  }

  return { namespacesRequired: ['common', 'noti'] }
}

const mapStateToProps = ({ blog }: RootState) => ({
  blogArticles: blog.list.blogArticles,
  pending: blog.list.pending,
  rejected: blog.list.rejected
})

export default connect(mapStateToProps)(BlogArticlePage);