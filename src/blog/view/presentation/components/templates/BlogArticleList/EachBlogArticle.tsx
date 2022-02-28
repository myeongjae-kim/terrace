import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";
import { Link } from "src/common/view/presentation/components/molecules";
import { formatDateTime } from "src/util";
import {BlogArticleListResponse} from "src/blog/domain/BlogArticleListResponse";
import {Theme} from "@mui/material";

const hoverBackgroundBrightColor = "230, 230, 230";
const hoverBackgroundDarkColor = "60, 60, 60";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: `${theme.spacing(1.5)} 0`,
    marginBottom: theme.spacing(1),
    "&:hover": {
      background: `rgba(${theme.palette.mode === "dark"
        ? hoverBackgroundDarkColor
        : hoverBackgroundBrightColor }, 0.23) !important`
    },
    "& > div": {
      padding: "1px 0"
    }
  },
  title: {
    fontSize: "1.18em"
  },
  date: {
    color: theme.palette.text.primary
  }
}));

interface Props {
  blogArticle: BlogArticleListResponse;
}

const EachBlogArticle: React.FC<Props> = ({ blogArticle }) => {
  const { title, createdAt, uri } = blogArticle;
  const classes = useStyles();
  return <Link href={uri}>
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.date}>{formatDateTime(createdAt, "YYYY / MM / DD")}</div>
    </div>
  </Link >;
};

export default EachBlogArticle;
