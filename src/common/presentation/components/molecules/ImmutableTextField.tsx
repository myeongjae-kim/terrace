import {createStyles, TextField, TextFieldProps} from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import * as React from "react";

const useStyles = makeStyles(createStyles({
  root: {
    margin: 0
  }
}));

const ImmutableTextField: React.FC<TextFieldProps> = (props) => {
  const classes = useStyles();
  const { className, margin, placeholder, disabled, value } = props;

  return <TextField
    {...props}
    className={clsx(classes.root, className)}
    margin={margin || "normal"}
    InputProps={{ readOnly: true }}
    InputLabelProps={{ shrink: true }}
    // It's okay to let a default value be "none" because this component is immutable.
    placeholder={placeholder || "none"}
    disabled={disabled || (!value && value !== 0)}
  />;
};


export default ImmutableTextField;
