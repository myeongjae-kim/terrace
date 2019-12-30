import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ErrorPage from 'pages/_error';
import * as React from 'react';
import { HeadTitle, Link, MarkdownPreview, Maybe } from 'src/common/presentation/components/molecules';
import { DailyDetailResponseDto } from 'src/daily/api';
import { formatDateTime } from 'src/util';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(62.5),
    marginBottom: theme.spacing(3),
  },
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(4)}px 0`,
  },
  serif: {
    fontFamily: 'Noto Serif KR',
    fontWeight: 400,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  markdownContainer: {
    textIndent: ".5em",
    background: "#f4f4f4",
    padding: "5px 10px 5px 10px",
    margin: `0 ${theme.spacing(0.5)}px`,
    fontSize: ".9em",
    lineHeight: "1.6em",
    border: "1px solid #e0e0e0!important",
    borderRadius: 5,
  },
  markdownPreview: {
    '& blockquote': {
      textIndent: 'initial',
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0!important",
      borderRadius: 5,
      margin: "5px 0",
      padding: "0 20px",
    }
  }
}))

interface Props {
  daily: DailyDetailResponseDto
  pending: boolean
  rejected: boolean
  statusCode: number
}

const DailyDetail: React.FC<Props> = ({ daily, rejected, statusCode }) => {
  const classes = useStyles();
  const {
    seq,
    createdAt,
    title,
    slug,
    content
  } = daily;

  return <>
    <Maybe test={!rejected}>
      <HeadTitle title={title} />
      <div className={classes.center}>
        <div className={classes.container}>
          <div className={classes.center}>
            <Link href="/daily/detail" as={"./" + slug}>
              <Typography className={clsx(classes.serif, classes.title)}>
                {seq}. [{formatDateTime(createdAt, "YYYY.MM.DD")}] {title}
              </Typography>
            </Link>
          </div>
          <div className={clsx(classes.center, classes.markdownContainer)}>
            <MarkdownPreview markdown={content} className={clsx(classes.markdownPreview, classes.serif)} />
          </div>
        </div>
      </div>
    </Maybe>
    <Maybe test={rejected}>
      <ErrorPage statusCode={statusCode} />
    </Maybe>
  </>;
}

export default DailyDetail;