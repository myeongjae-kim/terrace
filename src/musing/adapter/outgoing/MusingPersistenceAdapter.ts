import {StrapiResponse} from "../../../common/domain/StrapiResponse";
import {AxiosInstance} from "axios";
import {API_HOST, Endpoints} from "../../../common/constants/Constants";
import {MusingLoadPort} from "../../application/port/outgoing/MusingLoadPort";
import {MusingStrapi} from "../../application/port/outgoing/MusingStrapi";

export class MusingPersistenceAdapter implements MusingLoadPort {

  constructor(private readonly axios: AxiosInstance) {}

  public findAll = (): Promise<StrapiResponse<MusingStrapi>> =>
    this.axios.get<StrapiResponse<MusingStrapi>>(`${API_HOST}${Endpoints.musings}`, {
      params: {
        "sort[0]": "id:asc",
        "pagination[pageSize]": 100 // 최대 100개.
      }
    }).then(it => it.data);
}
