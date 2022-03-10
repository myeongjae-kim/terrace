import * as React from "react";
import {MarkdownPreview} from "src/common/view/presentation/components/molecules";
import {createStyles, makeStyles} from "@mui/styles";
import clsx from "clsx";
import {Theme, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material";

interface Props {
  content: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  content: {
    fontSize: "1.1em",
    lineHeight: 1.9,
    fontFamily: "Noto Serif KR",
    margin: `0 ${theme.spacing(1)}`,
    "& pre, blockquote": {
      margin: `${theme.spacing(2)} 0`
    },
    "& table": {
      border: `1px solid ${theme.palette.divider}`
    }
  },
  contentSmallWidth: {
    fontSize: "0.95em"
  }
}));

const ArticleContent = ({ content }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallWidth = useMediaQuery(theme.breakpoints.down("xs"));

  return <MarkdownPreview className={clsx(classes.content, {[classes.contentSmallWidth]: smallWidth})} markdown={content} />;
};

export default ArticleContent;
