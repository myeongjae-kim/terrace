import { createStyles, makeStyles } from "@mui/styles";
import clsx from "clsx";
import * as React from "react";
import {alpha} from "@mui/system";
import {red} from "@mui/material/colors";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Theme} from "@mui/material";

export interface ConfirmPayload {
  title?: string;
  content: string;
  onClick?(e?: React.MouseEvent): void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  dialogContent: { paddingBottom: 0 },
  dialogActions: { paddingTop: 0 },
  confirmButton: {
    color: theme.palette.primary.dark,
    "&:focus": {
      background: alpha(theme.palette.primary.dark, 0.1),
    }
  },
  abortButton: {
    color: red[500],
    "&:focus": {
      background: alpha(red[500], 0.1),
    }
  }
}));

export interface ConfirmProps {
  isConfirmOpened: boolean;
  confirmData: ConfirmPayload;
  closeConfirmDialog(): void;
}

const Confirm: React.FC<ConfirmProps> = ({ isConfirmOpened, confirmData, closeConfirmDialog }) => {
  const classes = useStyles();
  const { title, content, onClick } = confirmData;
  const abort = () => {
    closeConfirmDialog();
  };

  const confirm = (e: React.MouseEvent) => {
    closeConfirmDialog();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Dialog
      open={isConfirmOpened}
      onClose={abort}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle hidden={!title} id="confirm-dialog-title">{title}</DialogTitle>
      <div hidden={!!title} className={classes.spacing} />
      <DialogContent className={clsx({ [classes.dialogContent]: !title })}>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={clsx({ [classes.dialogActions]: !title })}>
        <Button onClick={abort} className={classes.abortButton}>
          {"abort"}
        </Button>
        <Button onClick={confirm} className={classes.confirmButton} autoFocus>
          <strong> {"confirm"} </strong>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
