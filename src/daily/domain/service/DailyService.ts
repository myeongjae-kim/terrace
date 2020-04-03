import { DailyDetailPathDto, DailyDetailResponseDto, DailyListResponseDto } from "src/daily/api";
import { DailyDetailRequestDto } from "src/daily/api/dto/DailyDetailRequestDto";

export interface DailyService {
  findAll(): Promise<DailyListResponseDto[]>;
  find(req: DailyDetailPathDto): Promise<DailyDetailResponseDto>;
  update(req: DailyDetailPathDto, body: DailyDetailRequestDto): Promise<void>;
  create(body: DailyDetailRequestDto): Promise<string>;
  delete(req: DailyDetailPathDto): Promise<void>;
}