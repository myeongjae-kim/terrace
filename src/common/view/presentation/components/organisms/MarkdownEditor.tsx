import { makeStyles, TextField, TextFieldProps } from "@material-ui/core"; // 이거 건들면 색깔 바뀌네.. mui4 제거면서 마지막으로 고쳐보자
import * as React from "react";
import Spacer from "../molecules/Spacer";
import clsx from "clsx";
import {CardContent } from "@mui/material";
import {Theme} from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  spacing: { height: theme.spacing(1) },
  flex: {
    display: "flex",
    flexWrap: "wrap"
  },
  textInput: {
    background: theme.palette.primary.contrastText
  },
  container: {
    margin: theme.spacing(1),
    minWidth: theme.spacing(40),
    width: `calc(50% - ${theme.spacing(2)}px)`,
    height: `calc(100vh - ${theme.spacing(7)}px)`,
    overflowY: "scroll",
    padding: theme.spacing(1)
  },
  fieldContainer: {
    "& textarea": {
      lineHeight: "1.6em"
    }
  },
  preview: {
    boxShadow: "0px 0px 0px 3px rgba(0,0,0,0.1)",
    borderRadius: 5
  }
}));

interface Props {
  PreviewComponent: React.ComponentType<{content: string}>;
}

const MarkdownEditor: React.FC<TextFieldProps & Props> = (props) => {
  const classes = useStyles();
  const { value } = props;
  return <div className={classes.flex}>
    <div className={classes.container}>
      <Spacer size={2.5} />
      <CardContent className={classes.preview}>
        <props.PreviewComponent content={value as string} />
      </CardContent>
    </div>
    <div className={clsx(classes.container, classes.fieldContainer)}>
      <CardContent>
        <TextField
          {...props}
          multiline
          style={{
            fontFamily: "Noto Serif KR"
          }}
        />
      </CardContent>
    </div>
  </div>;
};

export default MarkdownEditor;
