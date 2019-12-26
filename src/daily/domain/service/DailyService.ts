import { Daily } from "../model";

export interface DailyService {
  findAll(): Promise<Daily[]>
}