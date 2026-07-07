import type {
  PaginatedResult,
  PaginationInput,
} from "#/core/common/model/Pagination";
import type { Musing, MusingId } from "#/core/musings/domain";

export interface MusingsQueryPort {
  get(input: { id: MusingId }): Promise<Musing | null>;
  list(input?: PaginationInput): Promise<PaginatedResult<Musing>>;
}
