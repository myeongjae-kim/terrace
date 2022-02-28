import {StrapiResponse} from "../../../common/domain/StrapiResponse";
import Axios from "axios";
import {API_HOST, Endpoints} from "../../../common/constants/Constants";
import RepositoryError from "../../../common/exception/RepositoryError";
import {LoadDailyPort} from "../../application/port/outgoing/LoadDailyPort";
import {DailyListStrapi} from "./DailyListStrapi";
import {DailyStrapi} from "./DailyStrapi";

export class DailyPersistenceAdapter implements LoadDailyPort {
  private readonly listFields = ["seq", "title", "slug", "created_at"];

  public findAll = (page: number): Promise<StrapiResponse<DailyListStrapi>> =>
    Axios.get<StrapiResponse<DailyListStrapi>>(`${API_HOST}${Endpoints.daily}`, {
      params: {
        fields: this.listFields,
        sort: ["seq:desc"],
        "pagination[page]": page,
        "pagination[pageSize]": 20
      }
    }).then(it => it.data);

  public getBySlug = async (slug: string): Promise<DailyStrapi> => {
    const article: DailyStrapi | undefined =
      await Axios.get<{ data: DailyStrapi[] }>(`${API_HOST}${Endpoints.daily}`, {
        params: {
          "filters[slug][$eq]": slug
        }
      })
        .then(it => it.data.data[0]);
    if (typeof article === "undefined") {
      throw RepositoryError.of();
    }

    return article;
  };
}
