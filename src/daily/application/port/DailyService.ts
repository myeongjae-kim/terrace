import { DailyFindAllUseCase } from "./incoming/DailyFindAllUseCase";
import { DailyGetUseCase } from "./incoming/DailyGetUseCase";
import { DailyDetailResponse } from "../../domain/DailyDetailResponse";
import { DailyListResponse } from "../../domain/DailyListResponse";
import { StrapiResponse } from "../../../common/domain/StrapiResponse";
import { Daily } from "../../domain";
import { DailyLoadSupabasePort } from "./outgoing/DailyLoadSupabasePort";

export class DailyService implements DailyFindAllUseCase, DailyGetUseCase{

  constructor(private readonly loadDailyPort: DailyLoadSupabasePort) { }

  public getBySlug = (slug: string): Promise<DailyDetailResponse> =>
    this.loadDailyPort.getBySlug(slug)
      .then(it => ({
        id: "" + it.id,
        seq: it.seq,
        createdAt: it.created_at,
        updatedAt: it.updated_at,
        title: it.title,
        slug: it.slug,
        content: it.content,
      }));

  public findAll = (page: number): Promise<StrapiResponse<DailyListResponse>> =>
    this.loadDailyPort.findAll(page)
      .then(data => ({
        data: data.data.map(it => ({
          id: "" + it.id,
          seq: it.seq,
          createdAt: it.created_at,
          uri: Daily.createUri({createdAt: it.created_at, slug: it.slug}),
          title: it.title,
        })),
        meta: data.meta,
      }));
}
