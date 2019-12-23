import { createStyles, makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(createStyles({
  footer: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return <footer className={classes.footer}>
    <div>
      푸터
    </div>
  </footer>;
}

export default Footer;