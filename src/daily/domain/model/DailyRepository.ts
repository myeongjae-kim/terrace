import Optional from "optional-js";
import { Repository } from "typeorm";
import { Daily } from ".";

export interface DailyRepository extends Repository<Daily> {
  findAllByOrderBySeqDesc(): Promise<Daily[]>
  findBySlug(slug: string): Promise<Optional<Daily>>
}