import {createStyles, makeStyles} from "@mui/styles";
import * as React from "react";
import {HeadTitle} from "src/common/view/presentation/components/molecules";
import {ArticleContent} from "../../organisms";
import ArticleHead from "./ArticleHead";
import ArticlePrevAndNext from "./ArticlePrevAndNext";
import {BlogArticleDetailResponse} from "../../../../../domain/BlogArticleDetailResponse";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(100),
    margin: "auto"
  }
}));

export interface BlogArticleDetailProps {
  blogArticle: BlogArticleDetailResponse;
}

const BlogArticleDetail = ({ blogArticle }: BlogArticleDetailProps) => {
  const classes = useStyles();
  const { title, slug, content, createdAt, prev, next } = blogArticle;
  return <>
    <HeadTitle title={title} />
    <div className={classes.container}>
      <ArticleHead title={title} slug={slug} createdAt={createdAt} />
      <ArticleContent content={content} />
      <ArticlePrevAndNext prev={prev} next={next} />
    </div>
  </>;
};

export default BlogArticleDetail;
