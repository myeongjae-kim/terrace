import { BlogArticle } from "src/view/blog/domain/model";

export interface BlogArticleListResponseDto {
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
