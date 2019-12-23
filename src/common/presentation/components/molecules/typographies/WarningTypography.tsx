import { makeStyles, Typography } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { Warning } from '@material-ui/icons';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles(createStyles({
  typography: {
    color: orange[700],
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
    <Typography variant="caption" className={classes.typography}>
      <Warning className={classes.icon} />&nbsp;
      {children}
    </Typography>
  </div>
}

export default InfoTypography;