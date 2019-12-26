import { createStyles, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { DailyListResponseDto } from 'src/daily/api';
import { formatDateTime } from 'src/util';

const useStyles = makeStyles(createStyles({
  seq: {
    textAlign: 'right'
  }
}))

interface Props {
  daily: DailyListResponseDto
}

const EachDaily: React.FC<Props> = ({ daily }) => {
  const classes = useStyles();
  return <tr>
    <td className={classes.seq}>{daily.seq}.</td>
    <td>[{formatDateTime(new Date(daily.createdAt), "yyyy.MM.dd")}]</td>
    <td>{daily.title}</td>
  </tr>;
}

export default EachDaily;