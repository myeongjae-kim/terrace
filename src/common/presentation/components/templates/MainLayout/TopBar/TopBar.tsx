import { AppBar, createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
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

const TopBar: React.FC = () => {
  const classes = useStyles();

  return <AppBar
    elevation={0}
    color="inherit"
    position="relative"
    className={clsx(classes.appBar)}
  >
    <div className={classes.center}>
      <HomeButton />
    </div>
    <div className={classes.center}>
      <Navigation items={items} />
    </div>
  </AppBar >;
}

export default TopBar;