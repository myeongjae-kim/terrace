import type { Article } from "#/core/article/domain";
import type {
  PaginatedResult,
  PaginationInput,
} from "#/core/common/model/Pagination";

export interface ListArticlesUseCase {
  list(input?: PaginationInput): Promise<PaginatedResult<Article>>;
}
