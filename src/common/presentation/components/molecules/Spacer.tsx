import { useTheme } from '@material-ui/core';
import * as React from 'react';

interface Props {
  size?: number
}

const Spacer: React.SFC<Props> = ({ size = 1 }) => {
  const theme = useTheme();
  return <div style={{ height: theme.spacing(size) }} />;
}

export default Spacer;