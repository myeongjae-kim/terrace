import * as React from "react";
import {red} from "@mui/material/colors";
import {
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme, useTheme
} from "@mui/material";
import {useMemo} from "react";

export interface ConfirmPayload {
  title?: string;
  content: string;
  onClick?(e?: React.MouseEvent): void;
}

const styleObjects = (theme: Theme) => ({
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
});

export interface ConfirmProps {
  isConfirmOpened: boolean;
  confirmData: ConfirmPayload;
  closeConfirmDialog(): void;
}

const Confirm: React.FC<ConfirmProps> = ({ isConfirmOpened, confirmData, closeConfirmDialog }) => {
  const theme = useTheme();
  const styles = useMemo(() => styleObjects(theme), [theme]);
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
      <div hidden={!!title} style={styles.spacing} />
      <DialogContent sx={title ? styles.dialogContent: {}}>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={title ? styles.dialogActions: {}}>
        <Button onClick={abort} sx={styles.abortButton}>
          {"abort"}
        </Button>
        <Button onClick={confirm} sx={styles.confirmButton} autoFocus>
          <strong> {"confirm"} </strong>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
