import { useTheme } from '@material-ui/core';
import { NextPageContext } from 'next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Store } from 'redux';
import { BlogArticleDetailRequestDto } from 'src/blog/api/dto';
import BlogArticleDetail from 'src/blog/presentation/components/templates/BlogArticleDetail';
import { BlogArticleDetailProps } from 'src/blog/presentation/components/templates/BlogArticleDetail/BlogArticleDetail';
import * as detailModule from "src/blog/presentation/state-modules/detail";
import { DOMAIN_BLOG } from 'src/common/constants/Constants';
import NextPage from 'src/common/domain/model/NextPage';
import { Disqus } from 'src/common/presentation/components/organisms';
import { RootState } from 'src/common/presentation/state-module/root';
import { formatDateTime, redirectFromGetInitialPropsTo } from 'src/util';

const BlogArticleDetailPage: NextPage = () => {
  const props = useSelector<RootState, BlogArticleDetailProps>(({ blog }) => blog.detail)
  const dispatch = useDispatch<Dispatch<detailModule.Action>>();

  const theme = useTheme();
  React.useEffect(() => () => {
    dispatch(detailModule.reset());
  }, [])

  const { title, createdAt, slug } = props.blogArticle;
  const uri = `/${formatDateTime(createdAt, "YYYY/MM/DD")}/${slug}/`;

  return <>
    <BlogArticleDetail {...props} />
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

export default BlogArticleDetailPage;