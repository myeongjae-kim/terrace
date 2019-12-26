import { DailyListResponseDto } from "src/daily/api";

export interface DailyService {
  findAll(): Promise<DailyListResponseDto[]>
}