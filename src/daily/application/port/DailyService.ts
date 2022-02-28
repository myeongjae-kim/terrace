import {DailyFindAllUseCase} from "./incoming/DailyFindAllUseCase";
import {DailyGetUseCase} from "./incoming/DailyGetUseCase";
import {DailyLoadPort} from "./outgoing/DailyLoadPort";
import {DailyDetailResponse} from "../../domain/DailyDetailResponse";
import {DailyListResponse} from "../../domain/DailyListResponse";
import {StrapiResponse} from "../../../common/domain/StrapiResponse";
import {Daily} from "../../domain";

export class DailyService implements DailyFindAllUseCase, DailyGetUseCase{

  constructor(private readonly loadDailyPort: DailyLoadPort) { }

  public getBySlug = (slug: string): Promise<DailyDetailResponse> =>
    this.loadDailyPort.getBySlug(slug)
      .then(it => ({
        id: "" + it.id,
        seq: it.attributes.seq,
        createdAt: it.attributes.createdAt,
        updatedAt: it.attributes.updatedAt,
        title: it.attributes.title,
        slug: it.attributes.slug,
        content: it.attributes.content,
      }));

  public findAll = (page: number): Promise<StrapiResponse<DailyListResponse>> =>
    this.loadDailyPort.findAll(page)
      .then(data => ({
        data: data.data.map(it => ({
          id: "" + it.id,
          seq: it.attributes.seq,
          createdAt: it.attributes.createdAt,
          uri: Daily.createUri({createdAt: it.attributes.createdAt, slug: it.attributes.slug}),
          title: it.attributes.title,
        })),
        meta: data.meta,
      }));
}
