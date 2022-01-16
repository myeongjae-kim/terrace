import { Button } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import * as snackbarModule from "../../state-module/snackbar";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles(createStyles({
  icon: {
    opacity: 0.8,
    minWidth: "initial"
  }
}));

const NotificationCenterButton: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<Dispatch<snackbarModule.Action>>();

  const onClick = () => { dispatch(snackbarModule.openNotificationCenter()); };

  return <Button
    onClick={onClick}
    className={classes.icon}
    size="small"
  >
    <Notifications />
  </Button>;
};

export default NotificationCenterButton;
