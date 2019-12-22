import { Paper, Tab, Tabs, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import FIRST_DEPTH_PATHS from 'src/common/domain/constants/FIRST_DEPTH_PATHS';
import { Link } from '../molecules';

const TAB_WIDTH = 110;

interface StyledTabsProps {
  value: number
  className: string;
  onChange?(event: React.ChangeEvent<{}>, newValue: number): void;
}

const StyledTabs = withStyles((theme: Theme) => createStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: TAB_WIDTH,
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
}))((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

interface StyledTabProps {
  label: string;
  className: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      minWidth: TAB_WIDTH,
      '&:focus': {
        opacity: 1,
      },
    },
  }),
)((props: StyledTabProps) => <Tab {...props} />);


const useStyles = makeStyles({
  tab: {
    minHeight: "initial",
    fontSize: "0.9em",
  },
  eachTab: {
    '&:focus': {
      background: grey[300]
    }
  },
  paper: {
    background: grey[100]
  }
});

interface Props {
  value: number
}

const HorizontalMenuBar: React.FC<Props> = ({ value }) => {
  const classes = useStyles();

  return (
    <Paper square className={classes.paper} elevation={0}>
      <StyledTabs
        className={classes.tab}
        value={value}
      >
        {FIRST_DEPTH_PATHS.map((path, index) =>
          <Link key={index} href={path} underline="none" color="inherit">
            <StyledTab className={clsx(classes.tab, classes.eachTab)} label={path} />
          </Link>
        )}
      </StyledTabs>
    </Paper>
  );
}

export default HorizontalMenuBar;