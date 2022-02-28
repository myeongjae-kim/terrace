import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {DailyListResponse} from "../../../domain/DailyListResponse";

export interface GetDailyListUseCase {
  getList(page: number): Promise<StrapiResponse<DailyListResponse>>
}
