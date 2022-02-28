import {StrapiResponse} from "../../../common/domain/StrapiResponse";
import Axios from "axios";
import {API_HOST, Endpoints} from "../../../common/constants/Constants";
import {LoadMusingPort} from "../../application/port/outgoing/LoadMusingPort";
import {MusingStrapi} from "../../application/port/outgoing/MusingStrapi";

export class MusingPersistenceAdapter implements LoadMusingPort {
  public findAll = (): Promise<StrapiResponse<MusingStrapi>> =>
    Axios.get<StrapiResponse<MusingStrapi>>(`${API_HOST}${Endpoints.musings}`, {
      params: {
        "sort[0]": "id:asc",
        "pagination[pageSize]": 100 // 최대 100개.
      }
    }).then(it => it.data);
}
