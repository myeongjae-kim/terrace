import { createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { WithTranslation } from 'react-i18next';
import I18NService from 'src/common/domain/service/I18NService';
import HorizontalMenuBarContainer from '../../../container/molecules/HorizontalMenuBarContainer';
import TopBar from './TopBar';

const horizontalMenuBarHeight = 31; /* manually calculate the height of horizonMenuBar */

const { withTranslation } = I18NService;

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    marginTop: theme.spacing(5),
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(2)
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  horizontalMenuBarWrapper: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer - 1,
    width: "100%"
  },
  horizontalMenuBar: {
    height: horizontalMenuBarHeight
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
      <div style={{ width: "100%" }}>
        <div className={classes.toolbar} />
        <div className={classes.horizontalMenuBarWrapper}>
          <HorizontalMenuBarContainer />
        </div>
        <main className={classes.content}>
          <div className={classes.horizontalMenuBar} />
          {children}
        </main>
      </div>
    </div>
  );
}

export default withTranslation('common')(MainLayout);