import * as React from "react";
import { MarkdownPreview } from "src/common/view/presentation/components/molecules";
import { makeStyles, createStyles } from "@mui/styles";
import {Theme} from "@mui/material";

interface Props {
  content: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  content: {
    fontWeight: 400,
    textIndent: ".5em",
    background: theme.palette.mode === "dark" ? theme.palette.background.paper : "#f4f4f4",
    padding: "5px 10px 5px 10px",
    margin: `0 ${theme.spacing(0.5)}`,
    fontSize: ".9em",
    lineHeight: "1.9em",
    border: `1px solid ${theme.palette.divider} !important`,
    borderRadius: 5,

    "& blockquote, pre": {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider} !important`,
      margin: `${theme.spacing(2)} 0`,
    },

    "& blockquote": {
      textIndent: "initial",
      padding: "0 20px",
    },

    "& table": {
      border: `1px solid ${theme.palette.divider}`
    }
  }
}));

const DailyContent = ({ content }: Props) => {
  const classes = useStyles();
  return <MarkdownPreview className={classes.content} markdown={content} />;
};

export default DailyContent;
