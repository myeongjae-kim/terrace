import { createStyles, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { PageTitle } from 'src/common/presentation/components/molecules';
import { MusingResponseDto } from 'src/musings/api/dto';
import EachMusing from './EachMusing'

const useStyles = makeStyles(createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  eachItem: {
    maxWidth: 450,
  }
}))

interface Props {
  items: MusingResponseDto[]
}

const Musings: React.FC<Props> = ({ items }) => {
  const classes = useStyles();
  return <div>
    <PageTitle title="quotes" />
    <div className={classes.container}>
      <div className={classes.eachItem}>
        {items.map(i => <EachMusing key={i.from} item={i} />)}
      </div>
    </div>
    <style jsx global>{`
        nav > a > button, h1 {
          font-family: 'Bad Script' !important;
        }
        h1 {
          margin-bottom: 12px !important;
        }
      `}
    </style>
  </div>
}

export default Musings;