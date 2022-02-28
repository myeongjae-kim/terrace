import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {MusingResponseDto} from "../../../domain";

export interface MusingFindAllUseCase {
  findAll(): Promise<StrapiResponse<MusingResponseDto>>
}
