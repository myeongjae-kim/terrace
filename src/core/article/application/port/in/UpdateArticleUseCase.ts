import type {
  Article,
  ArticleId,
  UpdateArticleValues,
} from "#/core/article/domain";

export interface UpdateArticleUseCase {
  update(input: {
    id: ArticleId;
    values: UpdateArticleValues;
  }): Promise<Article | null>;
}
