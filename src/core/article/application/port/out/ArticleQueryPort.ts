import type {
  Article,
  ArticleCategory,
  ArticleId,
} from "#/core/article/domain";
import type {
  PaginatedResult,
  PaginationInput,
} from "#/core/common/model/Pagination";

export interface ArticleQueryPort {
  get(input: { id: ArticleId }): Promise<Article | null>;
  list(input?: PaginationInput): Promise<PaginatedResult<Article>>;
  listPublished(input: {
    category: ArticleCategory;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResult<Article>>;
  getPublishedBySlug(input: {
    category: ArticleCategory;
    slug: string;
  }): Promise<Article | null>;
}
