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
    fontSize: '2em',
    fontWeight: 100,
    textTransform: "capitalize",
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px 0`,
    "@media screen and (max-width: 600px)": {
      margin: `${theme.spacing(1.5)}px 0 ${theme.spacing(2.5)}px 0`
    }
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