import type { MusingId } from "#/core/musings/domain";

export interface DeleteMusingUseCase {
  delete(input: { id: MusingId }): Promise<boolean>;
}
