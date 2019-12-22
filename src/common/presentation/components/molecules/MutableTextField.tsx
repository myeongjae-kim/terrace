import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { ErrorTypography } from '.';

export default (props: WrappedFieldProps & TextFieldProps) => {
  const { input, rowsMax, fullWidth } = props;
  const { touched, error } = props.meta;
  const showError = error && touched;
  return (
    <>
      <TextField
        {...props}
        {...input}
        error={showError}
        rowsMax={rowsMax ? rowsMax : 1e7}
        fullWidth={typeof fullWidth === "undefined" ? true : fullWidth}
      />
      <ErrorTypography hidden={!showError}>{error}</ErrorTypography>
    </>
  )
}