import { AppBar, createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import { Link, MyButton } from '../../molecules';

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  buttonContainer: {
    display: 'flex'
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
      {items.map(({ href, label }) => <Link key={href} href={href}>
        <MyButton>
          {label}
        </MyButton>
      </Link>)}
    </div>
  </AppBar>;
}

export default TopBar;