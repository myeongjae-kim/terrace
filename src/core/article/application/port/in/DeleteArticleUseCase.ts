import type { ArticleId } from "#/core/article/domain";

export interface DeleteArticleUseCase {
  delete(input: { id: ArticleId }): Promise<boolean>;
}
