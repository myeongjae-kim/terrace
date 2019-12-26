import { createStyles, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { PageTitle } from 'src/common/presentation/components/molecules';
import { DailyListResponseDto } from 'src/daily/api';
import DailyList from './DailyList';

const useStyles = makeStyles(createStyles({
  dailyList: {
    display: 'flex',
    justifyContent: 'center',
  }
}))

interface Props {
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean
}

const Daily: React.FC<Props> = ({ dailys }) => {
  const classes = useStyles();
  return <div>
    <PageTitle title="daily" />
    <div className={classes.dailyList}>
      <DailyList dailys={dailys} />
    </div>
  </div>
}

export default Daily;