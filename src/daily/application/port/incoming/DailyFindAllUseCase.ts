import {Response} from "../../../../common/domain/Response";
import {DailyListResponse} from "../../../domain/DailyListResponse";

export interface DailyFindAllUseCase {
  findAll(page: number): Promise<Response<DailyListResponse>>
}
