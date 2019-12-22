import { Button, createStyles, makeStyles } from '@material-ui/core';
import { Notifications } from '@material-ui/icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as snackbarModule from '../../state-module/snackbar';

const useStyles = makeStyles(createStyles({
  icon: {
    opacity: 0.8,
    minWidth: 'initial'
  }
}))

interface Props {
  dispatchers: typeof snackbarModule
}

const NotificationCenterButton: React.FC<Props> = ({ dispatchers }) => {
  const classes = useStyles();

  return <Button
    onClick={dispatchers.openNotificationCenter}
    className={classes.icon}
    size="small"
  >
    <Notifications />
  </Button>
}

const mapDispatchToProps = (dispatch: Dispatch<snackbarModule.Action>) => ({
  dispatchers: bindActionCreators(snackbarModule, dispatch)
})

export default connect(null, mapDispatchToProps)(NotificationCenterButton);