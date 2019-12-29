import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Store } from 'redux';
import { BlogArticleDetailRequestDto, BlogArticleDetailResponseDto } from 'src/blog/api/dto';
import BlogArticleDetail from 'src/blog/presentation/components/templates/BlogArticleDetail';
import * as detailModule from "src/blog/presentation/state-modules/detail";
import NextPage from 'src/common/domain/model/NextPage';
import { RootState } from 'src/common/presentation/state-module/root';
import { redirectFromGetInitialPropsTo } from 'src/util';

interface Props {
  blogArticle: BlogArticleDetailResponseDto
  pending: boolean
  rejected: boolean
  statusCode: number

  dispatchers: typeof detailModule
}

const BlogArticleDetailPage: NextPage<Props> = ({ blogArticle, pending, rejected, statusCode, dispatchers }) => {
  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  return <BlogArticleDetail
    blogArticle={blogArticle}
    pending={pending}
    rejected={rejected}
    statusCode={statusCode} />

}

BlogArticleDetailPage.getInitialProps = async ({ store, asPath, res }: { store: Store<RootState> } & NextPageContext) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {}
  }

  fetchBlogArticleDetail(store, parsePathToBlogArticleDetailRequest(asPath));

  return { namespacesRequired: ['common', 'noti'] }
}

const fetchBlogArticleDetail = (store: Store<RootState>, req: BlogArticleDetailRequestDto): void => {
  store.dispatch(detailModule.fetchBlogArticle({ blogArticle: req }))
}

const parsePathToBlogArticleDetailRequest = (asPath: string): BlogArticleDetailRequestDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[2],
    month: splitted[3],
    day: splitted[4],
    slug: splitted[5],
  }
}

const mapStateToProps = ({ blog }: RootState) => ({
  blogArticle: blog.detail.blogArticle,
  pending: blog.detail.pending,
  rejected: blog.detail.rejected,
  statusCode: blog.detail.statusCode,
})

const mapDispatchToProps = (dispatch: Dispatch<detailModule.Action>) => ({
  dispatchers: bindActionCreators(detailModule, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogArticleDetailPage);