import * as React from "react";
import {MarkdownPreview} from "src/common/presentation/components/molecules";
import {Theme} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";

interface Props {
  content: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  content: {
    fontSize: "1.1em",
    lineHeight: 1.9,
    fontFamily: "Noto Serif KR",
    margin: `0 ${theme.spacing(1)}px`,
  }
}));

const ArticleContent: React.FC<Props> = ({ content }) => {
  const classes = useStyles();
  return <MarkdownPreview className={classes.content} markdown={content} />;
};

export default ArticleContent;
