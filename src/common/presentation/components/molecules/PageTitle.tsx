import { createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';

interface Props {
  title: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'default',
    userSelect: 'none'
  },
  title: {
    textTransform: "capitalize",
    marginTop: 0,
    marginBottom: theme.spacing(3)
  }
}));

const PageTitle: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  return <div className={classes.container}>
    <h1 className={classes.title}>
      {title}
    </h1>
  </div>
}


export default PageTitle;