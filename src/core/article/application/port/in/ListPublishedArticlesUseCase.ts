import type { Article, ArticleCategory } from "#/core/article/domain";
import type { PaginatedResult } from "#/core/common/model/Pagination";

export interface ListPublishedArticlesUseCase {
  list(input: {
    category: ArticleCategory;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResult<Article>>;
}
