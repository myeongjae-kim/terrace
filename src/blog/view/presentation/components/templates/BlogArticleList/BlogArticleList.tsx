import {createStyles, makeStyles} from "@mui/styles";
import * as React from "react";
import EachBlogArticle from "./EachBlogArticle";
import {StrapiPagination} from "src/common/domain/StrapiPagination";
import {BlogArticleListResponse} from "src/blog/domain/BlogArticleListResponse";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(75),
    margin: "auto",
    textAlign: "center",
    marginTop: `-${theme.spacing(1.5)}`
  }
}));

export interface BlogArticleListProps {
  blogArticles: BlogArticleListResponse[];
  pagination: StrapiPagination,
}

const BlogArticleList = ({ blogArticles }: BlogArticleListProps) => {
  const classes = useStyles();
  return <div>
    <div className={classes.container}>
      {blogArticles.map(b => <EachBlogArticle key={b.id} blogArticle={b} />)}
    </div>
  </div>;
};

export default BlogArticleList;
