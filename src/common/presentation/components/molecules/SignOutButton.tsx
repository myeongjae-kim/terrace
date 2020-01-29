import { createStyles, Fab, makeStyles, Theme, Tooltip } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { ExitToApp } from '@material-ui/icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import * as meModule from 'src/auth/presentation/state-modules/me';
import * as signModule from 'src/auth/presentation/state-modules/sign';
import { Maybe } from '.';
import { RootState } from '../../state-module/root';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(3),
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }
}))

const selector = createSelector<RootState, meModule.State, boolean>(
  root => root.auth.me,
  me => me.isSignedIn
);

const SignOutButton: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch<Dispatch<meModule.Action | signModule.Action>>();
  React.useEffect(() => {
    dispatch(meModule.me());
  }, [])
  const signOut = React.useCallback(() => {
    dispatch(signModule.signOut())
  }, [])

  const isSignedIn = useSelector(selector);

  return <>
    <Maybe test={isSignedIn}>
      <Tooltip title="로그아웃" placement="left">
        <Fab className={classes.button} onClick={signOut}>
          <ExitToApp />
        </Fab>
      </Tooltip>
    </Maybe>
  </>;
}

export default SignOutButton;