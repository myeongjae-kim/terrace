import { Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Warning } from "@mui/icons-material";
import { makeStyles, createStyles } from "@mui/styles";
import * as React from "react";

const useStyles = makeStyles(createStyles({
  typography: {
    color: orange[700],
    whiteSpace: "pre-wrap",
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 13,
    marginTop: 3,
    float: "left"
  }
}));

interface Props {
  hidden?: boolean;
}

const InfoTypography: React.FC<Props> = ({ children, hidden }) => {
  const classes = useStyles();
  return <div hidden={hidden}>
    <Typography variant="caption" className={classes.typography}>
      <Warning className={classes.icon} />&nbsp;
      {children}
    </Typography>
  </div>;
};

export default InfoTypography;
