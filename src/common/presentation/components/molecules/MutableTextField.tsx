import {TextField, TextFieldProps} from "@mui/material";
import * as React from "react";
import { WrappedFieldProps } from "redux-form";
import { ErrorTypography } from ".";

export default (props: WrappedFieldProps & TextFieldProps) => {
  const { input, maxRows, fullWidth } = props;
  const { touched, error } = props.meta;
  const showError = error && touched;
  return (
    <>
      <TextField
        {...props}
        {...input}
        error={showError}
        maxRows={maxRows ? maxRows : 1e7}
        fullWidth={typeof fullWidth === "undefined" ? true : fullWidth}
      />
      <ErrorTypography hidden={!showError}>{error}</ErrorTypography>
    </>
  );
};
