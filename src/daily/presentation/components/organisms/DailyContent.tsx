import * as React from "react";
import { MarkdownPreview } from "src/common/presentation/components/molecules";
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

    "& blockquote": {
      textIndent: "initial",
      backgroundColor: theme.palette.type === "dark" ? "#000" : "#fff",
      border: `1px solid ${theme.palette.divider} !important`,
      borderRadius: 5,
      margin: "5px 0",
      padding: "0 20px",
    }
  }
}));

const DailyContent: React.FC<Props> = ({ content }) => {
  const classes = useStyles();
  return <MarkdownPreview className={classes.content} markdown={content} />;
};

export default DailyContent;