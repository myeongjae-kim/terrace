import { CardContent, makeStyles, TextField, TextFieldProps, Theme } from '@material-ui/core';
import * as React from 'react';
import { MarkdownPreview } from '../molecules';
import Spacer from '../molecules/Spacer';

const useStyles = makeStyles((theme: Theme) => ({
  spacing: { height: theme.spacing(1) },
  flex: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textInput: {
    background: theme.palette.primary.contrastText
  },
  previewContainer: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(40),
    width: `calc(50% - ${theme.spacing(2)}px)`
  },
  fieldContainer: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(40),
    width: `calc(50% - ${theme.spacing(2)}px)`
  },
  preview: {
    boxShadow: '0px 0px 0px 3px rgba(0,0,0,0.1)',
    borderRadius: 5
  }
}))

const MarkdownEditor: React.FC<TextFieldProps> = (props) => {
  const classes = useStyles();
  const { value } = props;
  return <div className={classes.flex}>
    <div className={classes.previewContainer}>
      <Spacer size={2.5} />
      <CardContent className={classes.preview}>
        <MarkdownPreview markdown={value as string} />
      </CardContent>
    </div>
    <div className={classes.fieldContainer}>
      <CardContent>
        <TextField
          {...props}
          multiline
        />
      </CardContent>
    </div>
  </div>;
}

export default MarkdownEditor;