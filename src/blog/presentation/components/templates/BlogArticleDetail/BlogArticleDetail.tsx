import {createStyles, makeStyles, Theme} from "@material-ui/core";
import ErrorPage from "pages/_error";
import * as React from "react";
import {BlogArticleDetailResponseDto} from "src/blog/api";
import {HeadTitle, Maybe} from "src/common/presentation/components/molecules";
import {ArticleContent} from "../../organisms";
import ArticleHead from "./ArticleHead";
import ArticlePrevAndNext from "./ArticlePrevAndNext";
import Loading from "../../../../../Loading";

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    maxWidth: theme.spacing(100),
    margin: "auto"
  }
}));

export interface BlogArticleDetailProps {
  blogArticle: BlogArticleDetailResponseDto;
  pending: boolean;
  rejected: boolean;
  statusCode: number;

  update(e: React.MouseEvent): void;
  del(): void;
}

const BlogArticleDetail: React.FC<BlogArticleDetailProps> = ({ blogArticle, rejected, statusCode}) => {
  const classes = useStyles();
  const { title, slug, content, createdAt, prev, next } = blogArticle;
  return <>
    <Maybe test={!rejected && title}>
      <HeadTitle title={title} />
      <div className={classes.container}>
        <ArticleHead title={title} slug={slug} createdAt={createdAt} />
        <ArticleContent content={content} />
        <ArticlePrevAndNext prev={prev} next={next} />
      </div>
    </Maybe>

    <Maybe test={!title}>
      <Loading style={{paddingTop: "calc(30vh)", paddingBottom: "calc(50vh)"}} />
    </Maybe>

    <Maybe test={rejected}>
      <ErrorPage statusCode={statusCode} />
    </Maybe>
  </>;
};

export default BlogArticleDetail;
