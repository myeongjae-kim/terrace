import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {MusingStrapi} from "./MusingStrapi";

export interface MusingLoadPort {
  findAll(): Promise<StrapiResponse<MusingStrapi>>
}
