import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {MusingResponseDto} from "../../../domain";

export interface GetMusingListUseCase {
  findAll(): Promise<StrapiResponse<MusingResponseDto>>
}
