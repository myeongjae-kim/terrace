import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import ErrorPage from 'pages/_error';
import * as React from 'react';
import { BlogArticleDetailResponseDto } from 'src/blog/api';
import { Endpoints } from 'src/common/constants/Constants';
import { HeadTitle, Maybe, MySpeedDial } from 'src/common/presentation/components/molecules';
import { createLinkClickHandler, getSeoulDateFrom } from 'src/util';
import ArticleContent from './ArticleContent';
import ArticleHead from './ArticleHead';
import ArticlePrevAndNext from './ArticlePrevAndNext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(100),
    margin: 'auto'
  }
}))

export interface BlogArticleDetailProps {
  blogArticle: BlogArticleDetailResponseDto
  isSignedIn: boolean
  pending: boolean
  rejected: boolean
  statusCode: number
}

const BlogArticleDetail: React.FC<BlogArticleDetailProps> = ({ blogArticle, isSignedIn, rejected, statusCode }) => {
  const classes = useStyles();
  const { title, slug, content, createdAt, prev, next } = blogArticle;
  return <>
    <Maybe test={!rejected}>
      <HeadTitle title={title} />
      <div className={classes.container}>
        <ArticleHead title={title} slug={slug} createdAt={createdAt} />
        <ArticleContent content={content} />
        <ArticlePrevAndNext prev={prev} next={next} />
      </div>
      <Maybe test={isSignedIn}>
        <MySpeedDial actions={[{
          name: "수정",
          icon: <Edit />,
          handleClick: e => createLinkClickHandler(
            Endpoints["blog.update"],
            Endpoints["blog.update"] + getSeoulDateFrom(createdAt).format("/YYYY/MM/DD/") + slug,
          )(e)
        }, {
          name: "삭제",
          icon: <Delete />
        }]} />
      </Maybe>
    </Maybe>

    <Maybe test={rejected}>
      <ErrorPage statusCode={statusCode} />
    </Maybe>
  </>;
}

export default BlogArticleDetail;