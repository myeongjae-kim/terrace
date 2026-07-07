import type {
  Article,
  ArticleId,
  CreateArticleInput,
  UpdateArticleValues,
} from "#/core/article/domain";

export interface ArticleCommandPort {
  create(input: CreateArticleInput): Promise<Article>;
  update(input: {
    id: ArticleId;
    values: UpdateArticleValues;
  }): Promise<Article | null>;
  delete(input: { id: ArticleId }): Promise<boolean>;
}
