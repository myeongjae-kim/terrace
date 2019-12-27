import { DailyDetailRequestDto, DailyDetailResponseDto, DailyListResponseDto } from "src/daily/api";

export interface DailyService {
  findAll(): Promise<DailyListResponseDto[]>
  find(req: DailyDetailRequestDto): Promise<DailyDetailResponseDto>
}