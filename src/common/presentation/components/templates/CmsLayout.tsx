import { Link as MuiLink } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { grey } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { WithTranslation } from 'react-i18next';
import { FirstDepthPath } from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import SIDE_BAR_ITEMS from 'src/common/domain/constants/SIDE_BAR_ITEMS';
import I18NService from 'src/common/domain/service/I18NService';
import HorizontalMenuBarContainer from '../../container/molecules/HorizontalMenuBarContainer';
import LanguageToggleButton from '../atmos/LanguageToggleButton';
import Link from '../atmos/Link';
import NotificationCenterButton from '../atmos/NotificationCenterButton';

const drawerWidth = 240;
const horizontalMenuBarHeight = 31; /* manually calculate the height of horizonMenuBar */

const { withTranslation } = I18NService;

const useStyles = makeStyles((theme: Theme) => createStyles({
  flex: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "0 0px 8px 0 rgba(0, 0, 0, 0.1)"
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
  toggleOpen(): void
}

const CmsLayout: React.FC<Props> = ({ children, t, paths, open, toggleOpen }) => {
  const classes = useStyles();
  const currentSideBarItems = SIDE_BAR_ITEMS.get(paths[0] as FirstDepthPath) || [[]]

  const currentPath = paths.reduce((prev, curr) => prev + "/" + curr)

  return (
    <div className={classes.flex}>
      <CssBaseline />
      <AppBar
        elevation={0}
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={toggleOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.toolbarContents}>
            <MuiLink href="/" underline="none" color="inherit">
              <Typography variant="h6" noWrap style={{
                fontFamily: "BM HANNA",
              }}>
                {t('kiworkshop')} CMS
            </Typography>
            </MuiLink>
            <div>
              <NotificationCenterButton />
              <LanguageToggleButton />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        {currentSideBarItems.map((items, listIndex) =>
          <Fragment key={listIndex}>
            {listIndex > 0 && <Divider />}
            <List className={clsx({
              [classes.listDrawerClose]: !open
            })}>
              {items.map(item => (
                <Link key={item.text} href={item.href}>
                  <ListItem
                    button
                    className={classes.listItem}
                  >
                    <div className={clsx(classes.listItemContent, {
                      [classes.flex]: open,
                      [classes.listItemContentDrawerClose]: !open
                    })}>
                      <ListItemIcon className={classes.listItemIcon}>
                        {item.icon({
                          color: currentPath.startsWith(item.href) ?
                            "primary" :
                            "inherit"
                        })}
                      </ListItemIcon>
                      <ListItemText
                        primary={t(item.text)}
                        primaryTypographyProps={{ style: { fontSize: open ? "0.8rem" : "0.9em" } }}
                        className={clsx(classes.listItemText, {
                          [classes.textAlignCenter]: !open
                        })}
                      />
                    </div>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Fragment>)}
      </Drawer>
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

export default withTranslation('common')(CmsLayout);