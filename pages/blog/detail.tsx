import { useTheme } from '@material-ui/core';
import { NextPageContext } from 'next';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Store } from 'redux';
import { createSelector } from 'reselect';
import * as meModule from 'src/auth/presentation/state-modules/me';
import { BlogArticleDetailResponseDto, BlogArticlePathDto } from 'src/blog/api/dto';
import BlogArticleDetail from 'src/blog/presentation/components/templates/BlogArticleDetail';
import * as detailModule from "src/blog/presentation/state-modules/detail";
import { Endpoints } from 'src/common/constants/Constants';
import NextPage from 'src/common/domain/model/NextPage';
import { Comment } from 'src/common/presentation/components/organisms';
import * as commonModule from "src/common/presentation/state-module/common";
import { RootState } from 'src/common/presentation/state-module/root';
import { createLinkClickHandler, formatDateTime, redirectFromGetInitialPropsTo } from 'src/util';

const selector = createSelector<RootState, detailModule.State, meModule.State, {
  blogArticle: BlogArticleDetailResponseDto
  isSignedIn: boolean
  pending: boolean
  rejected: boolean
  statusCode: number
}>(
  root => root.blog.detail,
  root => root.auth.me,
  (detail, me) => ({
    ...detail,
    isSignedIn: me.isSignedIn
  })
);

interface Props {
  blogArticlePathDto: BlogArticlePathDto
}

const BlogArticleDetailPage: NextPage<Props> = ({ blogArticlePathDto }) => {
  const props = useSelector(selector)
  const dispatch = useDispatch<Dispatch<detailModule.Action | commonModule.Action>>();

  const { createdAt, slug } = props.blogArticle;
  const uri = `${Endpoints["blog.update"]}${formatDateTime(createdAt, "/YYYY/MM/DD")}/${slug}/`;

  const update = React.useCallback((e: React.MouseEvent) => {
    createLinkClickHandler(
      Endpoints["blog.update"],
      uri
    )(e);
  }, [createdAt, slug])

  const del = React.useCallback(() => {
    dispatch(commonModule.openConfirmDialog({
      "content": "정말로 삭제하시겠습니까?",
      onClick: () => dispatch(detailModule.deleteBlogArticle({ blogArticlePathDto }))
    }))
  }, [])

  const theme = useTheme();
  React.useEffect(() => () => {
    dispatch(detailModule.reset());
  }, [])

  return <div>
    <BlogArticleDetail {...props} update={update} del={del} />
    <Comment identifier={uri} />
    <style jsx global>{`
#comment-container {
  max-width: ${theme.spacing(100)}px;
}
    `}</style>
  </div>
}

BlogArticleDetailPage.getInitialProps = async ({ store, asPath, res }: { store: Store<RootState> } & NextPageContext) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {}
  }

  const blogArticlePathDto = parsePathToBlogArticleDetailRequest(asPath);

  fetchBlogArticleDetail(store, blogArticlePathDto);

  return { namespacesRequired: ['common', 'noti'], blogArticlePathDto }
}

const fetchBlogArticleDetail = (store: Store<RootState>, req: BlogArticlePathDto): void => {
  store.dispatch(detailModule.fetchBlogArticle({ blogArticlePathDto: req }))
}

const parsePathToBlogArticleDetailRequest = (asPath: string): BlogArticlePathDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[2],
    month: splitted[3],
    day: splitted[4],
    slug: splitted[5],
  }
}

export default BlogArticleDetailPage;