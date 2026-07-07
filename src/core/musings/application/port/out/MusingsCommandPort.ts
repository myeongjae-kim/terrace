import type {
  CreateMusingInput,
  Musing,
  MusingId,
  UpdateMusingValues,
} from "#/core/musings/domain";

export interface MusingsCommandPort {
  create(input: CreateMusingInput): Promise<Musing>;
  update(input: {
    id: MusingId;
    values: UpdateMusingValues;
  }): Promise<Musing | null>;
  delete(input: { id: MusingId }): Promise<boolean>;
}
