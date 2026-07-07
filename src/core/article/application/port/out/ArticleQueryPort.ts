import type { Article, ArticleId } from "#/core/article/domain";
import type {
  PaginatedResult,
  PaginationInput,
} from "#/core/common/model/Pagination";

export interface ArticleQueryPort {
  get(input: { id: ArticleId }): Promise<Article | null>;
  list(input?: PaginationInput): Promise<PaginatedResult<Article>>;
}
