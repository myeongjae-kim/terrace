import { Button, createStyles, makeStyles, PropTypes, StyledComponentProps, Theme } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    textTransform: "capitalize",
    fontWeight: 300,
    transition: 'opacity 20ms',
    minWidth: 0,
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2),
    '&:hover': {
      opacity: 0.6
    }
  }
}))

interface Props extends StyledComponentProps {
  color?: PropTypes.Color;
  disableFocusRipple?: boolean;
  fullWidth?: boolean;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
}

const MyButton: React.FC<Props> = (props) => {
  const classes = useStyles();

  return <Button {...props} classes={{
    root: classes.button,
    ...props.classes
  }} />;
}

export default MyButton;