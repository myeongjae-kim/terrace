import {DailyDetailResponse} from "../../../domain/DailyDetailResponse";

export interface GetDailyUseCase {
  getBySlug(slug: string): Promise<DailyDetailResponse>
}
