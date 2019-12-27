import { createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'src/common/presentation/components/molecules';
import { DailyListResponseDto } from 'src/daily/api';
import { formatDateTime } from 'src/util';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    fontSize: '1rem',
    fontFamily: 'Noto Serif KR',
    fontWeight: 400
  },
  seq: {
    textAlign: 'right',
    width: theme.spacing(3)
  },
  date: {
    textAlign: 'center',
    width: theme.spacing(12)
  },
  title: {
    width: theme.spacing(25)
  }
}))

interface Props {
  daily: DailyListResponseDto
}

const EachDaily: React.FC<Props> = ({ daily }) => {
  const classes = useStyles();
  return <Link href="/daily/detail" as={daily.uri}>
    <div className={classes.container}>
      <div className={classes.seq}>{daily.seq}.</div>
      <div className={classes.date}>[{formatDateTime(daily.createdAt, "YYYY.MM.DD")}]</div>
      <div className={classes.title}>{daily.title}</div>
    </div>
  </Link>
}

export default EachDaily;