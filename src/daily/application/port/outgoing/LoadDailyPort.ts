import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {DailyStrapi} from "../../../adapter/outgoing/DailyStrapi";
import {DailyListStrapi} from "../../../adapter/outgoing/DailyListStrapi";

export interface LoadDailyPort {
  getBySlug(slug: string): Promise<DailyStrapi>
  findAll(page: number): Promise<StrapiResponse<DailyListStrapi>>
}
