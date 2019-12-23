import { createStyles, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx'
import * as React from 'react';
import I18NService from 'src/common/domain/service/I18NService';

const useStyles = makeStyles(createStyles({
  root: {
    margin: 0
  }
}));

const { useTranslation } = I18NService;

const ImmutableTextField: React.FC<TextFieldProps> = (props) => {
  const classes = useStyles();
  const { className, margin, placeholder, disabled, value } = props;
  const { t } = useTranslation("common");

  return <TextField
    {...props}
    className={clsx(classes.root, className)}
    margin={margin || "normal"}
    InputProps={{ readOnly: true }}
    InputLabelProps={{ shrink: true }}
    // It's okay to let a default value be "none" because this component is immutable.
    placeholder={placeholder || t("none")}
    disabled={disabled || (!value && value !== 0)}
  />;
}


export default ImmutableTextField;