import * as React from "react";
import {MarkdownPreview} from "src/view/common/presentation/components/molecules";
import {createStyles, makeStyles, Theme, useMediaQuery, useTheme} from "@material-ui/core";
import clsx from "clsx";

interface Props {
  content: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  content: {
    fontSize: "1.1em",
    lineHeight: 1.9,
    fontFamily: "Noto Serif KR",
    margin: `0 ${theme.spacing(1)}px`,
    "& pre, blockquote": {
      margin: `${theme.spacing(2)}px 0`
    },
    "& table": {
      border: `1px solid ${theme.palette.divider}`
    }
  },
  contentSmallWidth: {
    fontSize: "0.95em"
  }
}));

const ArticleContent: React.FC<Props> = ({ content }) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallWidth = useMediaQuery(theme.breakpoints.down("xs"));

  return <MarkdownPreview className={clsx(classes.content, {[classes.contentSmallWidth]: smallWidth})} markdown={content} />;
};

export default ArticleContent;
