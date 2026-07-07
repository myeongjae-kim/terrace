import type {
  Article,
  ArticleId,
  CreateArticleInput,
  UpdateArticleValues,
} from "#/core/article/domain";
import type {
  PaginatedResult,
  PaginationInput,
} from "#/core/common/model/Pagination";

export interface ArticleCrudUseCase {
  create(input: CreateArticleInput): Promise<Article>;
  get(input: { id: ArticleId }): Promise<Article | null>;
  list(input?: PaginationInput): Promise<PaginatedResult<Article>>;
  update(input: {
    id: ArticleId;
    values: UpdateArticleValues;
  }): Promise<Article | null>;
  delete(input: { id: ArticleId }): Promise<boolean>;
}
