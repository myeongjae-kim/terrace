import type {
  PaginatedResult,
  PaginationInput,
} from "#/core/common/model/Pagination";
import type { Musing } from "#/core/musings/domain";

export interface ListPublishedMusingsUseCase {
  list(input?: PaginationInput): Promise<PaginatedResult<Musing>>;
}
