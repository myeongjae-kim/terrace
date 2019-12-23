import { CardContent, createStyles, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { MarkdownPreview } from '../molecules';
import MutableTextField from '../molecules/MutableTextField';
import Spacer from '../molecules/Spacer';

const useStyles = makeStyles((theme: Theme) => createStyles({
  spacing: { height: theme.spacing(1) },
  flex: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textInput: {
    background: theme.palette.primary.contrastText
  },
  previewContainer: {
    marginRight: 20
  },
  preview: {
    boxShadow: '0px 0px 0px 3px rgba(0,0,0,0.1)',
    borderRadius: 5
  }
}))

const MarkdownEditor: React.FC<WrappedFieldProps> = (props) => {
  const classes = useStyles();
  const { input } = props;
  const [previewWidth] = React.useState(320);
  const [textFieldWidth] = React.useState(320);
  return <div className={classes.flex}>
    <div className={classes.previewContainer}>
      <Spacer size={2.5} />
      <CardContent className={classes.preview}>
        <MarkdownPreview markdown={input.value} style={{
          width: previewWidth
        }} />
      </CardContent>
    </div>
    <div>
      <CardContent style={{ width: textFieldWidth }}>
        <MutableTextField
          {...props}
          multiline
        />
      </CardContent>
    </div>
  </div>;
}

export default MarkdownEditor;