import type { Article, ArticleId } from "#/core/article/domain";

export interface GetArticleUseCase {
  get(input: { id: ArticleId }): Promise<Article | null>;
}
