import { useTheme } from "@mui/material";
import * as React from "react";

interface Props {
  size?: number;
}

const Spacer = ({ size = 1 }: Props) => {
  const theme = useTheme();
  return <div style={{ height: theme.spacing(size) }} />;
};

export default Spacer;
