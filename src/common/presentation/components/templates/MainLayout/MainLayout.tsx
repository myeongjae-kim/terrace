import { createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { WithTranslation } from 'react-i18next';
import I18NService from 'src/common/domain/service/I18NService';
import Footer from './Footer';
import TopBar from './TopBar';

const { withTranslation } = I18NService;

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    marginTop: theme.spacing(5),
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(2)
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

interface Props extends WithTranslation {
  paths: string[]
  open: boolean
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <CssBaseline />
      <TopBar />
      <main className={classes.content}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default withTranslation('common')(MainLayout);