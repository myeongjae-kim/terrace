import { createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { DailyDetailResponseDto, DailyListResponseDto } from 'src/daily/api';
import EachDaily from './EachDaily';

const useStyles = makeStyles((theme: Theme) => createStyles({
  dailyList: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  }
}))

interface Props {
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean

  currentDaily?: DailyDetailResponseDto
}

const DailyList: React.FC<Props> = ({ dailys, currentDaily }) => {
  const classes = useStyles();
  return <div className={classes.dailyList}>
    <div>
      {dailys.map(daily => <EachDaily
        key={daily.id}
        daily={daily}
        isLinkDisabled={daily.id === currentDaily?.id}
      />)}
    </div>
  </div>
}


export default DailyList;