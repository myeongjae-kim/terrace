import { Repository } from "typeorm";
import { Daily } from ".";

export interface DailyRepository extends Repository<Daily> {
  findAllByOrderBySeqDesc(): Promise<Daily[]>
}