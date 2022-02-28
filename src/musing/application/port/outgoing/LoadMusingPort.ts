import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {MusingStrapi} from "./MusingStrapi";

export interface LoadMusingPort {
  findAll(): Promise<StrapiResponse<MusingStrapi>>
}
