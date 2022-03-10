import * as React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import {Brightness4, Brightness7} from "@mui/icons-material";
import {IconButton, NoSsr, Theme} from "@mui/material";

interface Props {
  isDark: boolean;
  toggle(): void;
}
 
const useStyles = makeStyles((theme: Theme) => createStyles({
  icon: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    opacity: 0.5,
    zIndex: theme.zIndex.snackbar
  }
}));

const ColorModeChangeButton = ({isDark, toggle}: Props) => {
  const classes = useStyles();

  return <NoSsr>
    <IconButton className={classes.icon} onClick={toggle}>
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  </NoSsr>;
};
 
export default ColorModeChangeButton;
