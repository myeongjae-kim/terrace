import { useTheme } from '@material-ui/core';
import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Store } from 'redux';
import { BlogArticleDetailRequestDto, BlogArticleDetailResponseDto } from 'src/blog/api/dto';
import BlogArticleDetail from 'src/blog/presentation/components/templates/BlogArticleDetail';
import * as detailModule from "src/blog/presentation/state-modules/detail";
import { DOMAIN_BLOG } from 'src/common/constants/Constants';
import NextPage from 'src/common/domain/model/NextPage';
import { Disqus } from 'src/common/presentation/components/organisms';
import { RootState } from 'src/common/presentation/state-module/root';
import { formatDateTime, redirectFromGetInitialPropsTo } from 'src/util';

interface Props {
  blogArticle: BlogArticleDetailResponseDto
  pending: boolean
  rejected: boolean
  statusCode: number

  dispatchers: typeof detailModule
}

const BlogArticleDetailPage: NextPage<Props> = ({ blogArticle, pending, rejected, statusCode, dispatchers }) => {
  const theme = useTheme();
  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  const { title, createdAt, slug, } = blogArticle;
  const uri = `/${formatDateTime(createdAt, "YYYY/MM/DD")}/${slug}/`;

  return <>
    <BlogArticleDetail
      blogArticle={blogArticle}
      pending={pending}
      rejected={rejected}
      statusCode={statusCode} />
    <Disqus
      title={title}
      identifier={uri}
      url={`${DOMAIN_BLOG}${uri}`} />
    <style jsx global>{`
#disqus_thread {
  max-width: ${theme.spacing(100)}px;
}
    `}</style>
  </>

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