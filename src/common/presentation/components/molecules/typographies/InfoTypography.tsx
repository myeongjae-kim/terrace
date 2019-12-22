import { makeStyles, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
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
}

const InfoTypography: React.FC<Props> = ({ children, hidden }) => {
  const classes = useStyles();
  return <div hidden={hidden}>
    <Typography color="primary" variant="caption" className={classes.typography}>
      <Info className={classes.icon} />&nbsp;
      {children}
    </Typography>
  </div>
}

export default InfoTypography;