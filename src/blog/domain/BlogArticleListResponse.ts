import { BlogArticle } from "src/blog/domain/index";

export interface BlogArticleListResponse {
  id: string;
  seq: number;
  createdAt: string;
  uri: string;
  title: string;
}

export const createBlogArticleListResponseDtoFrom = (daily: BlogArticle) => {
  const { id, seq, createdAt, title } = daily;

  return {
    id,
    seq,
    createdAt: createdAt,
    uri: daily.getUri(),
    title
  };
};
