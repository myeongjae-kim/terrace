import {createStyles, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import EachBlogArticle from "./EachBlogArticle";
import {StrapiPagination} from "src/view/common/domain/model/StrapiPagination";
import {BlogArticleListResponse} from "src/blog/domain/BlogArticleListResponse";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(75),
    margin: "auto",
    textAlign: "center",
    marginTop: -theme.spacing(1.5)
  }
}));

export interface BlogArticleListProps {
  blogArticles: BlogArticleListResponse[];
  pagination: StrapiPagination,
}

const BlogArticleList: React.FC<BlogArticleListProps> = ({ blogArticles }) => {
  const classes = useStyles();
  return <div>
    <div className={classes.container}>
      {blogArticles.map(b => <EachBlogArticle key={b.id} blogArticle={b} />)}
    </div>
  </div>;
};

export default BlogArticleList;
