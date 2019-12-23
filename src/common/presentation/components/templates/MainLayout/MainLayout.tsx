import { createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import FooterContent from './FooterContent';
import TopBar from './TopBar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(2)
    },
    height: "100vh",
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  footer: {
    flexShrink: 0,
  }
}));

const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <CssBaseline />
      <TopBar />
      <main className={classes.content}>
        {children}
      </main>
      <footer className={classes.footer}>
        <FooterContent />
      </footer>
    </div>
  );
}

export default MainLayout;