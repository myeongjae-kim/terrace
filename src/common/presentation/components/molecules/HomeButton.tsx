import { Button, createStyles, makeStyles } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles(createStyles({
  button: {
    textTransform: "uppercase",
    fontFamily: "inconsolata",
    letterSpacing: 3,
    padding: '.3em 1.5em',
    transition: 'opacity 20ms',
    '&:hover': {
      opacity: 0.6
    }
  }
}))

const HomeButton: React.FC = () => {
  const classes = useStyles();
  return <Button classes={{
    root: classes.button
  }}>myeongjae kim</Button>;
}

export default HomeButton;