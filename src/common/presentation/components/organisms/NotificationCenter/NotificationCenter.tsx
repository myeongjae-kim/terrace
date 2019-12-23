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

interface Props {
  snackbars: Snackbar[]
  opened: boolean
  handleClose(): any
  handleRemove(key: string): any
}

const NotificationCenter: React.SFC<Props> = ({ snackbars, opened, handleClose, handleRemove }) => {
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