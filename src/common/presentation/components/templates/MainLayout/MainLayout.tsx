import { createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import { WithTranslation } from 'react-i18next';
import I18NService from 'src/common/domain/service/I18NService';
import HorizontalMenuBarContainer from '../../../container/molecules/HorizontalMenuBarContainer';
import TopBar from './TopBar';

const drawerWidth = 240;
const horizontalMenuBarHeight = 31; /* manually calculate the height of horizonMenuBar */

const { withTranslation } = I18NService;

const useStyles = makeStyles((theme: Theme) => createStyles({
  flex: {
    display: 'flex'
  },
  menuButton: {
    marginRight: 12,
    '&:hover': {
      background: "transparent"
    }
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    border: 0,
    background: grey[100]
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  horizontalMenuBar: {
    height: horizontalMenuBarHeight
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    '&:focus': {
      background: grey[300]
    }
  },
  listItemContent: {
    width: "100%"
  },
  listItemIcon: {
    minWidth: 50,
    marginLeft: (theme.spacing(7) + 1) / 2 - 12,
    [theme.breakpoints.up('sm')]: {
      marginLeft: (theme.spacing(9) + 1) / 2 - 12,
    },
  },
  listItemText: {
    fontSize: "0.8em",
    marginTop: 2
  },
  textAlignCenter: {
    textAlign: "center"
  },
  listDrawerClose: {
    paddingTop: 0
  },
  listItemContentDrawerClose: {
    paddingTop: 8
  },
  horizontalMenuBarWrapper: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer - 1,
    width: "100%"
  },
  toolbarContents: {
    display: 'flex',
    justifyContent: 'space-between',
    width: "100%"
  }
}));

interface Props extends WithTranslation {
  paths: string[]
  open: boolean
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
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