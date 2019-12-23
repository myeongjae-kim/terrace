import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import * as React from 'react';
import I18NService from 'src/common/domain/service/I18NService';
import { ConfirmPayload } from '../../state-module/common';

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  dialogContent: { paddingBottom: 0 },
  dialogActions: { paddingTop: 0 },
  confirmButton: {
    color: theme.palette.primary.dark,
    '&:focus': {
      background: fade(theme.palette.primary.dark, 0.1),
    }
  },
  abortButton: {
    color: red[500],
    '&:focus': {
      background: fade(red[500], 0.1),
    }
  }
}))

interface Props {
  isConfirmOpened: boolean
  confirmData: ConfirmPayload
  closeConfirmDialog(): void
}

const { useTranslation } = I18NService;

const Confirm: React.FC<Props> = ({ isConfirmOpened, confirmData, closeConfirmDialog }) => {
  const classes = useStyles();
  const { t } = useTranslation("common");
  const { title, content, onClick } = confirmData;
  const abort = () => {
    closeConfirmDialog();
  }

  const confirm = (e: React.MouseEvent) => {
    closeConfirmDialog();
    if (onClick) {
      onClick(e);
    }
  }

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
          {t('abort')}
        </Button>
        <Button onClick={confirm} className={classes.confirmButton} autoFocus>
          <strong> {t('confirm')} </strong>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirm;