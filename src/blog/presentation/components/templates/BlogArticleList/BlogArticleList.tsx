import {createStyles, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import {BlogArticleListResponseDto} from "src/blog/api";
import EachBlogArticle from "./EachBlogArticle";
import Loading from "src/Loading";
import {Maybe} from "src/common/presentation/components/molecules";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(75),
    margin: "auto",
    textAlign: "center",
    marginTop: -theme.spacing(1.5)
  }
}));

export interface BlogArticleListProps {
  blogArticles: BlogArticleListResponseDto[];
  pending: boolean;
  rejected: boolean;
}

const BlogArticleList: React.FC<BlogArticleListProps> = ({ blogArticles }) => {
  const classes = useStyles();
  return <div>
    <div className={classes.container}>
      <Maybe test={blogArticles.length === 0}>
        <Loading />
      </Maybe>
      <Maybe test={blogArticles.length !== 0}>
        {blogArticles.map(b => <EachBlogArticle key={b.id} blogArticle={b} />)}
      </Maybe>
    </div>
  </div>;
};

export default BlogArticleList;
