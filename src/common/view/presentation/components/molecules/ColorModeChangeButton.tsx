import * as React from "react";
import { makeStyles, createStyles, NoSsr } from "@material-ui/core";
import {Brightness4, Brightness7} from "@mui/icons-material";
import {IconButton} from "@material-ui/core"; // mui5로 가면 색깔 깨진다.

interface Props {
  isDark: boolean;
  toggle(): void;
}
 
const useStyles = makeStyles(theme => createStyles({
  icon: {
    position: "absolute",
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
