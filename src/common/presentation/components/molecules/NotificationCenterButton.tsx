import { Button, createStyles, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import * as snackbarModule from '../../state-module/snackbar';

const useStyles = makeStyles(createStyles({
  icon: {
    opacity: 0.8,
    minWidth: 'initial'
  }
}))

const NotificationCenterButton: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<snackbarModule.Action>>();

  const onClick = () => { dispatch(snackbarModule.openNotificationCenter()) }

  return <Button
    onClick={onClick}
    className={classes.icon}
    size="small"
  >
    <Notifications />
  </Button>
}

export default NotificationCenterButton;