import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {DailyListResponse} from "../../../domain/DailyListResponse";

export interface DailyFindAllUseCase {
  findAll(page: number): Promise<StrapiResponse<DailyListResponse>>
}
