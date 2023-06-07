import { StrapiResponse } from "../../../../common/domain/StrapiResponse";
import { DailyListSupabase } from "./DailyListSupabase";
import { DailySupabase } from "./DailySupabase";

export interface DailyLoadSupabasePort {
  getBySlug(slug: string): Promise<DailySupabase>
  findAll(page: number): Promise<StrapiResponse<DailyListSupabase>>
}
