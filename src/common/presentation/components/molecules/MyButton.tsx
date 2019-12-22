import { Button, PropTypes } from '@material-ui/core';
import * as React from 'react';

interface Props {
  color?: PropTypes.Color;
  disableFocusRipple?: boolean;
  fullWidth?: boolean;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
}

const MyButton: React.FC<Props> = (props) => {
  return <Button {...props} />;
}

export default MyButton;