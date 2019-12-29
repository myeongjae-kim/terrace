import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'src/common/presentation/components/molecules';
import { formatDateTime } from 'src/util';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    margin: theme.spacing(2),
    textAlign: 'center'
  },
  head: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary
  },
  date: {
    fontSize: theme.typography.subtitle1.fontSize,
    userSelect: 'none'
  }
}))

interface Props {
  title: string
  slug: string
  createdAt: string
}

const ArticleHead: React.FC<Props> = ({ title, slug, createdAt }) => {
  const classes = useStyles();
  return <div className={classes.container}>
    <div className={classes.head}>
      <Link href="/blog/detail" as={"./" + slug} color="textPrimary" shallow={true}>
        <Typography variant="h1">{title}</Typography>
      </Link>
    </div >
    <div className={classes.date}>{formatDateTime(createdAt, "YYYY / MM / DD")}</div>
  </div >;
}

export default ArticleHead;