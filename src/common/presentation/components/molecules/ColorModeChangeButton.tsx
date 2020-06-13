import * as React from "react";
import { IconButton, makeStyles, createStyles, NoSsr } from "@material-ui/core";
import { Brightness7, Brightness4 } from "@material-ui/icons";

interface Props {
  isDark: boolean;
  toggle(): void;
}
 
const useStyles = makeStyles(theme => createStyles({
  icon: {
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
    opacity: 0.5,
    zIndex: theme.zIndex.snackbar
  }
}));

const ColorModeChangeButton: React.FC<Props> = ({isDark, toggle}) => {
  const classes = useStyles();

  return <NoSsr>
    <IconButton className={classes.icon} onClick={toggle}>
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  </NoSsr>;
};
 
export default ColorModeChangeButton;