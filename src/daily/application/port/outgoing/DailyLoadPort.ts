import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {DailyStrapi} from "./DailyStrapi";
import {DailyListStrapi} from "./DailyListStrapi";

export interface DailyLoadPort {
  getBySlug(slug: string): Promise<DailyStrapi>
  findAll(page: number): Promise<StrapiResponse<DailyListStrapi>>
}
