import type { CreateMusingInput, Musing } from "#/core/musings/domain";

export interface CreateMusingUseCase {
  create(input: CreateMusingInput): Promise<Musing>;
}
