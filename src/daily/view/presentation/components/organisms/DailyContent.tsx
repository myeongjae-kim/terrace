import * as React from "react";
import { MarkdownPreview } from "src/common/view/presentation/components/molecules";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

interface Props {
  content: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  content: {
    fontFamily: "Noto Serif KR",
    fontWeight: 400,
    textIndent: ".5em",
    background: theme.palette.type === "dark" ? theme.palette.background.paper : "#f4f4f4",
    padding: "5px 10px 5px 10px",
    margin: `0 ${theme.spacing(0.5)}px`,
    fontSize: ".9em",
    lineHeight: "1.9em",
    border: `1px solid ${theme.palette.divider} !important`,
    borderRadius: 5,

    "& blockquote, pre": {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider} !important`,
      margin: `${theme.spacing(2)}px 0`,
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

const DailyContent: React.FC<Props> = ({ content }) => {
  const classes = useStyles();
  return <MarkdownPreview className={classes.content} markdown={content} />;
};

export default DailyContent;
