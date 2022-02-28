import { useTheme } from "@mui/material";
import * as React from "react";

interface Props {
  size?: number;
}

const Spacer: React.FC<Props> = ({ size = 1 }) => {
  const theme = useTheme();
  return <div style={{ height: theme.spacing(size) }} />;
};

export default Spacer;
