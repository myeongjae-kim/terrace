import { MusingResponseDto } from "src/musings/api/dto";

export interface MusingService {
  findAll(): Promise<MusingResponseDto[]>
}