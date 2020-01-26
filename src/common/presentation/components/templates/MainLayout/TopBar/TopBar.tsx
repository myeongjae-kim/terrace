import { AppBar, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import * as meModule from 'src/auth/presentation/state-modules/me';
import * as signModule from 'src/auth/presentation/state-modules/sign';
import { RootState } from 'src/common/presentation/state-module/root';
import { Maybe } from '../../../molecules';
import HomeButton from './HomeButton';
import Navigation from './Navigation';

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "transparent",
    marginTop: theme.spacing(5),
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(3)
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  signOutButton: {
    position: 'absolute',
    right: 1
  }
}))

const items = [{
  href: ["/about", "/"],
  label: "about"
}, {
  href: ["/blog"],
  label: "blog"
}, {
  href: ["/daily"],
  label: "daily"
}, {
  href: ["/musings"],
  label: "musings"
}, {
  href: ["/places"],
  label: "places"
},]

const selector = createSelector<RootState, meModule.State, boolean>(
  root => root.auth.me,
  me => me.isSignedIn
);

const TopBar: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch<Dispatch<meModule.Action | signModule.Action>>();
  React.useEffect(() => {
    dispatch(meModule.me());
  }, [])
  const signOut = React.useCallback(() => {
    dispatch(signModule.signOut())
  }, [])

  const isSignedIn = useSelector(selector);

  return <AppBar
    elevation={0}
    color="inherit"
    position="relative"
    className={clsx(classes.appBar)}
  >
    <div className={classes.center}>
      <HomeButton />
      <Maybe test={isSignedIn}>
        <Button onClick={signOut} className={classes.signOutButton}>sign-out</Button>
      </Maybe>
    </div>
    <div className={classes.center}>
      <Navigation items={items} />
    </div>
  </AppBar >;
}

export default TopBar;