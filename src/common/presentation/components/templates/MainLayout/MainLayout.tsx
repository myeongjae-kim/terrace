import { createStyles, CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';
import FooterContent from './FooterContent';
import TopBar from './TopBar';

const useStyles = makeStyles(createStyles({
  rootContainer: {
    height: "100vh",
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
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