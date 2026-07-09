import type { Musing, MusingId } from "#/core/musings/domain";

export interface GetMusingUseCase {
  get(input: { id: MusingId }): Promise<Musing | null>;
}
