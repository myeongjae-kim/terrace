import type { Article, CreateArticleInput } from "#/core/article/domain";

export interface CreateArticleUseCase {
  create(input: CreateArticleInput): Promise<Article>;
}
