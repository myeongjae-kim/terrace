import { AppBar, createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { HomeButton, Link, MyButton } from '../../molecules';

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "transparent"
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  nav: {
    margin: `${theme.spacing(2.5)}px 0`,
    "@media screen and (max-width: 600px)": {
      margin: `${theme.spacing(0.3)}px 0`
    }
  }
}))

const items = [{
  href: "/about",
  label: "about"
}, {
  href: "/blog",
  label: "blog"
}, {
  href: "/daily",
  label: "daily"
}, {
  href: "/musings",
  label: "musings"
}, {
  href: "/places",
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
    <div className={classes.buttonContainer}>
      <HomeButton />
    </div>
    <nav className={clsx(classes.buttonContainer, classes.nav)}>
      {items.map(({ href, label }) => <Link key={href} href={href}>
        <MyButton>
          {label}
        </MyButton>
      </Link>)}
    </nav>
  </AppBar>;
}

export default TopBar;