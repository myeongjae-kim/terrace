import {createStyles, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import {BlogArticleListResponseDto} from "src/blog/api";
import EachBlogArticle from "./EachBlogArticle";
import Loading from "src/Loading";
import {Maybe} from "src/common/presentation/components/molecules";
import {StrapiPagination} from "../../../../../common/domain/model/StrapiPagination";

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
  pagination: StrapiPagination,
  pending: boolean;
  rejected: boolean;
}

const BlogArticleList: React.FC<BlogArticleListProps> = ({ blogArticles, pending }) => {
  const classes = useStyles();
  return <div>
    <div className={classes.container}>
      <Maybe test={pending}>
        <Loading />
      </Maybe>
      <Maybe test={!pending}>
        {blogArticles.map(b => <EachBlogArticle key={b.id} blogArticle={b} />)}
      </Maybe>
    </div>
  </div>;
};

export default BlogArticleList;
