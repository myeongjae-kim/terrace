import { MusingResponseDto } from "../../../domain";

export interface MusingFindAllUseCase {
  findAll(): Promise<MusingResponseDto[]>
}
