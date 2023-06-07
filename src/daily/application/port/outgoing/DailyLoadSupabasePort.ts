import { Response } from "../../../../common/domain/Response";
import { DailyListSupabase } from "./DailyListSupabase";
import { DailySupabase } from "./DailySupabase";

export interface DailyLoadSupabasePort {
  getBySlug(slug: string): Promise<DailySupabase>
  findAll(page: number): Promise<Response<DailyListSupabase>>
}
