import { createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { BlogArticleListResponseDto } from 'src/blog/api';
import { Link } from 'src/common/presentation/components/molecules';
import { formatDateTime } from 'src/util';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: `${theme.spacing(1.5)}px 0`,
    marginBottom: theme.spacing(1),
    '&:hover': {
      background: 'rgba(230, 230, 230, 0.23) !important'
    },
    '& > div': {
      padding: '1px 0'
    }
  },
  title: {
    fontSize: '1.18em'
  },
  date: {
    color: theme.palette.text.primary
  }
}))

interface Props {
  blogArticle: BlogArticleListResponseDto
}

const EachBlogArticle: React.SFC<Props> = ({ blogArticle }) => {
  const { title, createdAt, uri } = blogArticle;
  const classes = useStyles();
  return <>
    <Link href="/blog/detail" as={uri}>
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div className={classes.date}>{formatDateTime(createdAt, "YYYY / MM / DD")}</div>
      </div>
    </Link >
  </>
}

export default EachBlogArticle;