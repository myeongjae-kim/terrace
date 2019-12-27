import { createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import FooterContent from './FooterContent';
import TopBar from './TopBar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    height: "100vh",
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    margin: `0 ${theme.spacing(0.5)}px`,
    '& img[src*="#shadow"]': {
      boxShadow: "2px 2px 15px #ccc",
    },
    '& img[src*="#round"]': {
      borderRadius: "5px",
    },
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