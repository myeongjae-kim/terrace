import { createStyles, Drawer, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Snackbar } from '../../../state-module/snackbar';
import RenderNotification from './RenderNotification';

const useStyles = makeStyles(createStyles({
  drawerItems: {
    width: 340
  },
  paper: {
    background: 'rgba(70, 70, 70, 0.8)',
  }
}))

export interface NotificationCenterProps {
  snackbars: Snackbar[]
  opened: boolean
  handleClose(): void
  handleRemove(key: string): void
}

const NotificationCenter: React.SFC<NotificationCenterProps> = ({ snackbars, opened, handleClose, handleRemove }) => {
  const classes = useStyles();

  return <Drawer
    classes={{
      paper: classes.paper
    }}
    anchor="right"
    open={opened}
    onClose={handleClose}
  >
    <div className={classes.drawerItems}>
      {snackbars.map(s =>
        <RenderNotification
          key={s.key}
          snackbar={s}
          // tslint:disable-next-line: jsx-no-lambda
          handleRemove={() => handleRemove(s.key)}
        />)}
    </div>
  </Drawer >
}

export default NotificationCenter;