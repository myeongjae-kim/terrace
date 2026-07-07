import type {
  PaginatedResult,
  PaginationInput,
} from "#/core/common/model/Pagination";
import type {
  CreateMusingInput,
  Musing,
  MusingId,
  UpdateMusingValues,
} from "#/core/musings/domain";

export interface MusingsCrudUseCase {
  create(input: CreateMusingInput): Promise<Musing>;
  get(input: { id: MusingId }): Promise<Musing | null>;
  list(input?: PaginationInput): Promise<PaginatedResult<Musing>>;
  update(input: {
    id: MusingId;
    values: UpdateMusingValues;
  }): Promise<Musing | null>;
  delete(input: { id: MusingId }): Promise<boolean>;
}
