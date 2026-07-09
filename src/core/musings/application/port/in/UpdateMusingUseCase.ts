import type {
  Musing,
  MusingId,
  UpdateMusingValues,
} from "#/core/musings/domain";

export interface UpdateMusingUseCase {
  update(input: {
    id: MusingId;
    values: UpdateMusingValues;
  }): Promise<Musing | null>;
}
