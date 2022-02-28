import {DailyDetailResponse} from "../../../domain/DailyDetailResponse";

export interface DailyGetUseCase {
  getBySlug(slug: string): Promise<DailyDetailResponse>
}
