import { makeStyles, Typography } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles(createStyles({
  typography: {
    whiteSpace: 'pre-wrap'
  },
  icon: {
    fontSize: 13,
    marginTop: 3,
    float: "left"
  }
}));

interface Props {
  hidden?: boolean
  className?: string
}

const ErrorTypography: React.FC<Props> = ({ children, hidden, className }) => {
  const classes = useStyles();
  return <div hidden={hidden} className={className}>
    <Typography color="error" variant="caption" className={classes.typography}>
      <Error className={classes.icon} />&nbsp;
      {children}
    </Typography>
  </div>
}

export default ErrorTypography;