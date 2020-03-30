import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import NotificationCenter from "../../components/organisms/NotificationCenter";
import { NotificationCenterProps } from "../../components/organisms/NotificationCenter/NotificationCenter";
import { RootState } from "../../state-module/root";
import * as snackbarModule from "../../state-module/snackbar";

const NotificationCenterContainer: React.FC = () => {
  const props = useSelector<RootState, Omit<NotificationCenterProps, "handleClose" | "handleRemove">>(({ snackbar }) => ({
    snackbars: snackbar.snackbars,
    opened: snackbar.isNotificationCenterOpened
  }));
  const dispatch = useDispatch<Dispatch<snackbarModule.Action>>();

  const handleClose = () => { dispatch(snackbarModule.closeNotificationCenter()); };
  const handleRemove = (key: string) => { dispatch(snackbarModule.removeSnackbar({ key })); };

  return <NotificationCenter
    {...props}
    handleClose={handleClose}
    handleRemove={handleRemove}
  />;
};

export default NotificationCenterContainer;