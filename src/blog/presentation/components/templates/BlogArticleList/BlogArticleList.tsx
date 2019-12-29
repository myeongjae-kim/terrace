import { createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { BlogArticleListResponseDto } from 'src/blog/api';
import EachBlogArticle from './EachBlogArticle';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(75),
    margin: 'auto',
    textAlign: 'center',
    marginTop: -theme.spacing(1.5)
  }
}))

interface Props {
  blogArticles: BlogArticleListResponseDto[]
  pending: boolean
  rejected: boolean
}

const BlogArticleList: React.FC<Props> = ({ blogArticles }) => {
  const classes = useStyles();
  return <div>
    <div className={classes.container}>
      {blogArticles.map(b => <EachBlogArticle key={b.id} blogArticle={b} />)}
    </div>
  </div>
}

export default BlogArticleList;