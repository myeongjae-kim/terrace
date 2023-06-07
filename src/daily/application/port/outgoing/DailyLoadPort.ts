import { Response } from "../../../../common/domain/Response";
import { DailyList } from "./DailyList";
import { Daily } from "./Daily";

export interface DailyLoadPort {
  getBySlug(slug: string): Promise<Daily>
  findAll(page: number): Promise<Response<DailyList>>
}
