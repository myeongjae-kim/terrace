import {StrapiResponse} from "../../../common/domain/StrapiResponse";
import {AxiosInstance} from "axios";
import {Endpoints} from "../../../common/constants/Constants";
import RepositoryError from "../../../common/exception/RepositoryError";
import {DailyLoadPort} from "../../application/port/outgoing/DailyLoadPort";
import {DailyListStrapi} from "../../application/port/outgoing/DailyListStrapi";
import {DailyStrapi} from "../../application/port/outgoing/DailyStrapi";

export class DailyPersistenceAdapter implements DailyLoadPort {

  constructor(private readonly axios: AxiosInstance) {}

  private readonly listFields = ["seq", "title", "slug", "created_at"];

  public findAll = (page: number): Promise<StrapiResponse<DailyListStrapi>> =>
    this.axios.get<StrapiResponse<DailyListStrapi>>(Endpoints.daily, {
      params: {
        fields: this.listFields,
        sort: ["seq:desc"],
        "pagination[page]": page,
        "pagination[pageSize]": 20
      }
    }).then(it => it.data);

  public getBySlug = async (slug: string): Promise<DailyStrapi> => {
    const article: DailyStrapi | undefined =
      await this.axios.get<{ data: DailyStrapi[] }>(Endpoints.daily, {
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
