import { BlogFindAllUseCase } from "./port/incoming/BlogFindAllUseCase";
import { BlogGetUseCase } from "./port/incoming/BlogGetUseCase";
import { BlogGetPrevOrNextUseCase } from "./port/incoming/BlogGetPrevOrNextUseCase";
import { StrapiResponse } from "../../common/domain/StrapiResponse";
import { BlogArticle } from "../domain";
import { BlogArticleDetailResponse, BlogArticlePrevOrNext } from "../domain/BlogArticleDetailResponse";
import { BlogArticleListResponse } from "../domain/BlogArticleListResponse";
import { BlogArticleListSupabaseResponse, BlogLoadSupabasePort } from "./port/outgoing/BlogLoadSupabasePort";
import { BlogLoadPrevOrNextSupabasePort } from "./port/outgoing/BlogLoadPrevOrNextSupabasePort";

export class BlogService implements BlogFindAllUseCase, BlogGetUseCase, BlogGetPrevOrNextUseCase{

  private readonly defaultPrevOrNext: BlogArticlePrevOrNext = {
    id: "",
    createdAt: "",
    title: "",
    uri: "",
  };

  constructor(
    private readonly loadBlogPrevOrNextPort: BlogLoadPrevOrNextSupabasePort,
    private readonly loadBlogSupabasePort: BlogLoadSupabasePort
  ) { }

  public getBySlug = (slug: string): Promise<BlogArticleDetailResponse> =>
    this.loadBlogSupabasePort.getBySlug(slug)
      .then(it => ({
        id: "" + it.id,
        seq: it.seq,
        createdAt: it.created_at,
        updatedAt: it.updated_at,
        title: it.title,
        slug: it.slug,
        content: it.content,
        prev: this.defaultPrevOrNext,
        next: this.defaultPrevOrNext
      }));

  public findAll = (page: number): Promise<StrapiResponse<BlogArticleListResponse>> =>
    this.loadBlogSupabasePort.findAll(page)
      .then(data => ({
        data: data.data.map(it => ({
          id: "" + it.id,
          seq: it.seq,
          createdAt: it.created_at,
          uri: BlogArticle.createUri({createdAt: it.created_at, slug: it.slug}),
          title: it.title,
        })),
        meta: data.meta,
      }));

  public getPrevOf = (seq: number): Promise<BlogArticlePrevOrNext> =>
    this.loadBlogPrevOrNextPort.getPrevOf(seq).then(this.convertListToPrevOrNext);

  public getNextOf = (seq: number): Promise<BlogArticlePrevOrNext> =>
    this.loadBlogPrevOrNextPort.getNextOf(seq).then(this.convertListToPrevOrNext);

  private convertListToPrevOrNext = (list: BlogArticleListSupabaseResponse): BlogArticlePrevOrNext =>
    ({
      id: list.id,
      createdAt: list.created_at,
      title: list.title,
      uri: BlogArticle.createUri({createdAt: list.created_at, slug: list.slug}),
    });
}
