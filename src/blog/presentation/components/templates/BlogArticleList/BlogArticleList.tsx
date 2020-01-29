import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import * as React from 'react';
import { BlogArticleListResponseDto } from 'src/blog/api';
import { Endpoints } from 'src/common/constants/Constants';
import { Maybe, MySpeedDial } from 'src/common/presentation/components/molecules';
import { createLinkClickHandler } from 'src/util';
import EachBlogArticle from './EachBlogArticle';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(75),
    margin: 'auto',
    textAlign: 'center',
    marginTop: -theme.spacing(1.5)
  }
}))

export interface BlogArticleListProps {
  blogArticles: BlogArticleListResponseDto[]
  isSignedIn: boolean
  pending: boolean
  rejected: boolean
}

const BlogArticleList: React.FC<BlogArticleListProps> = ({ blogArticles, isSignedIn }) => {
  const classes = useStyles();
  return <div>
    <div className={classes.container}>
      {blogArticles.map(b => <EachBlogArticle key={b.id} blogArticle={b} />)}
    </div>
    <Maybe test={isSignedIn}>
      <MySpeedDial actions={[{
        icon: <Add />,
        name: "등록",
        handleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
          createLinkClickHandler(Endpoints["blog.create"])(e)
        }
      }]} />
    </Maybe>
  </div>
}

export default BlogArticleList;