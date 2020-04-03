import { DailyPathDto, DailyDetailResponseDto, DailyListResponseDto } from "src/daily/api";
import { DailyRequestDto } from "src/daily/api/dto/DailyRequestDto";

export interface DailyService {
  findAll(): Promise<DailyListResponseDto[]>;
  find(req: DailyPathDto): Promise<DailyDetailResponseDto>;
  update(req: DailyPathDto, body: DailyRequestDto): Promise<void>;
  create(body: DailyRequestDto): Promise<string>;
  delete(req: DailyPathDto): Promise<void>;
}