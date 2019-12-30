import { createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/common/presentation/state-module/root';
import { Link, MyButton } from '../../../molecules';

const useStyles = makeStyles((theme: Theme) => createStyles({
  nav: {
    fontWeight: 100,
    marginTop: theme.spacing(2.5),
    "@media screen and (max-width: 600px)": {
      marginTop: theme.spacing(1)
    }
  }
}))

interface Props {
  paths: string[]
  items: Array<{
    href: string[]
    label: string
  }>
}

const Navigation: React.FC<Props> = ({ items, paths }) => {
  const classes = useStyles();
  const firstPath = paths[0] || "";

  return <nav className={classes.nav}>
    {items.map(({ href, label }) => <Link key={href[0]} href={href[0]} shallow={true}>
      <MyButton rippleColorPrimary color={href.includes(firstPath) ? "primary" : "default"}>
        {label}
      </MyButton>
    </Link>)}
  </nav>;
}

const mapStateToProps = (state: RootState) => ({
  paths: state.common.paths
})

export default connect(mapStateToProps)(Navigation);