import {GetBlogListUseCase} from "./port/incoming/GetBlogListUseCase";
import {GetBlogUseCase} from "./port/incoming/GetBlogUseCase";
import {GetBlogPrevOrNextUseCase} from "./port/incoming/GetBlogPrevOrNextUseCase";
import {StrapiResponse} from "../../view/common/api/dto/StrapiResponse";
import {LoadBlogPort} from "./port/outgoing/LoadBlogPort";
import {LoadBlogPrevOrNextPort} from "./port/outgoing/LoadBlogPrevOrNext";
import {BlogArticle} from "../domain";
import {BlogArticleDetailResponse, BlogArticlePrevOrNext} from "../domain/BlogArticleDetailResponse";
import {BlogArticleListResponse} from "../domain/BlogArticleListResponse";
import {BlogArticleListStrapi} from "../adapter/outgoing/BlogArticleListStrapi";

export class BlogService implements GetBlogListUseCase, GetBlogUseCase, GetBlogPrevOrNextUseCase{

  private readonly loadBlogPort: LoadBlogPort;
  private readonly loadBlogPrevOrNextPort: LoadBlogPrevOrNextPort;
  
  private readonly defaultPrevOrNext: BlogArticlePrevOrNext = {
    id: "",
    createdAt: "",
    title: "",
    uri: "",
  };

  constructor(
    loadBlogPort: LoadBlogPort,
    loadBlogPrevOrNextPort: LoadBlogPrevOrNextPort
  ) {
    this.loadBlogPort = loadBlogPort;
    this.loadBlogPrevOrNextPort = loadBlogPrevOrNextPort;
  }
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

  public getList = (page: number): Promise<StrapiResponse<BlogArticleListResponse>> =>
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
