import { makeStyles } from "@mui/styles";
import * as React from "react";
import Spacer from "../molecules/Spacer";
import clsx from "clsx";
import { CardContent, TextFieldProps, Theme, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { IAceEditorProps } from "react-ace";
import _ from "lodash-es";

const AceNoSsr = dynamic(() => import("./AceWrapper"), {ssr: false});

const width = (theme: Theme) => `calc(50% - ${theme.spacing(2)})`;
const height = (theme: Theme) => `calc(100vh - ${theme.spacing(7)})`;

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
    minWidth: theme.spacing(40),
    width: width(theme),
    height: height(theme),
    overflowY: "scroll",
  },
  contentWrapper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  preview: {
    boxShadow: "0px 0px 0px 3px rgba(0,0,0,0.1)",
    borderRadius: 5
  }
}));

interface Props {
  PreviewComponent: React.ComponentType<{content: string}>;
}

const useOnChangeForAce = ({name, onChange}: {name?: string, onChange?: TextFieldProps["onChange"]}) => {
  const onChangeForAce: IAceEditorProps["onChange"] = (str): void => {
    onChange && onChange({
      target: {
        name,
        value: str
      }
    } as any);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(_.debounce(onChangeForAce, 500), [onChangeForAce]);
};

const MarkdownEditor = ({PreviewComponent, value, ...props}: TextFieldProps & Props) => {
  const classes = useStyles();
  const theme = useTheme();

  const onChangeForAce = useOnChangeForAce(props);

  return <div className={classes.flex}>
    <div className={classes.container}>
      <Spacer size={2.5} />
      <CardContent className={clsx(classes.preview, classes.contentWrapper)}>
        <PreviewComponent content={value as string} />
      </CardContent>
    </div>
    <div className={clsx(classes.container)}>
      <AceNoSsr width={"100%"} height={height(theme)} wrapEnabled onChange={onChangeForAce} value={value as string} />
    </div>
  </div>;
};

export default MarkdownEditor;
