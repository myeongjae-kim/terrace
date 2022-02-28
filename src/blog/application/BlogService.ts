import {BlogFindAllUseCase} from "./port/incoming/BlogFindAllUseCase";
import {BlogGetUseCase} from "./port/incoming/BlogGetUseCase";
import {BlogGetPrevOrNextUseCase} from "./port/incoming/BlogGetPrevOrNextUseCase";
import {StrapiResponse} from "../../common/domain/StrapiResponse";
import {BlogLoadPort} from "./port/outgoing/BlogLoadPort";
import {BlogLoadPrevOrNextPort} from "./port/outgoing/LoadBlogPrevOrNext";
import {BlogArticle} from "../domain";
import {BlogArticleDetailResponse, BlogArticlePrevOrNext} from "../domain/BlogArticleDetailResponse";
import {BlogArticleListResponse} from "../domain/BlogArticleListResponse";
import {BlogArticleListStrapi} from "./port/outgoing/BlogArticleListStrapi";

export class BlogService implements BlogFindAllUseCase, BlogGetUseCase, BlogGetPrevOrNextUseCase{

  private readonly defaultPrevOrNext: BlogArticlePrevOrNext = {
    id: "",
    createdAt: "",
    title: "",
    uri: "",
  };

  constructor(
    private readonly loadBlogPort: BlogLoadPort,
    private readonly loadBlogPrevOrNextPort: BlogLoadPrevOrNextPort
  ) { }

  public getBySlug = (slug: string): Promise<BlogArticleDetailResponse> =>
    this.loadBlogPort.getBySlug(slug)
      .then(it => ({
        id: "" + it.id,
        seq: it.attributes.seq,
        createdAt: it.attributes.createdAt,
        updatedAt: it.attributes.updatedAt,
        title: it.attributes.title,
        slug: it.attributes.slug,
        content: it.attributes.content,
        prev: this.defaultPrevOrNext,
        next: this.defaultPrevOrNext
      }));

  public findAll = (page: number): Promise<StrapiResponse<BlogArticleListResponse>> =>
    this.loadBlogPort.findAll(page)
      .then(data => ({
        data: data.data.map(it => ({
          id: "" + it.id,
          seq: it.attributes.seq,
          createdAt: it.attributes.createdAt,
          uri: BlogArticle.createUri({createdAt: it.attributes.createdAt, slug: it.attributes.slug}),
          title: it.attributes.title,
        })),
        meta: data.meta,
      }));

  public getPrevOf = (seq: number): Promise<BlogArticlePrevOrNext> =>
    this.loadBlogPrevOrNextPort.getPrevOf(seq).then(this.convertListToPrevOrNext);

  public getNextOf = (seq: number): Promise<BlogArticlePrevOrNext> =>
    this.loadBlogPrevOrNextPort.getNextOf(seq).then(this.convertListToPrevOrNext);

  private convertListToPrevOrNext = (list: BlogArticleListStrapi): BlogArticlePrevOrNext =>
    ({
      id: "" + list.id,
      createdAt: list.attributes.createdAt,
      title: list.attributes.title,
      uri: BlogArticle.createUri({createdAt: list.attributes.createdAt, slug: list.attributes.slug}),
    });
}
