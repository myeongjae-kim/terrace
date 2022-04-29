import {BlogLoadPort} from "src/blog/application/port/outgoing/BlogLoadPort";
import {BlogLoadPrevOrNextPort} from "src/blog/application/port/outgoing/LoadBlogPrevOrNext";
import {StrapiResponse} from "../../../common/domain/StrapiResponse";
import {AxiosInstance} from "axios";
import {Endpoints} from "../../../common/constants/Constants";
import RepositoryError from "../../../common/exception/RepositoryError";
import {BlogArticleListStrapi} from "../../application/port/outgoing/BlogArticleListStrapi";
import {BlogArticleStrapi} from "../../application/port/outgoing/BlogArticleStrapi";

export class BlogPersistenceAdapter implements BlogLoadPort, BlogLoadPrevOrNextPort {

  constructor(private readonly axios: AxiosInstance) {}

  private readonly listFields = ["seq", "title", "slug", "created_at"];
  private readonly defaultPrevOrNext: BlogArticleListStrapi = {
    id: -1,
    attributes: {
      seq: -1,
      createdAt: "",
      updatedAt: "",
      slug: "",
      title: "",
    }
  };
  
  public findAll = (page: number): Promise<StrapiResponse<BlogArticleListStrapi>> =>
    this.axios.get<StrapiResponse<BlogArticleListStrapi>>(Endpoints.blog, {
      params: {
        fields: this.listFields,
        sort: ["seq:desc"],
        "pagination[page]": page,
        "pagination[pageSize]": 10
      }
    }).then(it => it.data);

  public getBySlug = async (slug: string): Promise<BlogArticleStrapi> => {
    const article: BlogArticleStrapi | undefined =
      await this.axios.get<{ data: BlogArticleStrapi[] }>(Endpoints.blog, {
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

  public getNextOf = async (seq: number): Promise<BlogArticleListStrapi> => {
    const prev: BlogArticleListStrapi | undefined =
      await this.axios.get<{ data: BlogArticleListStrapi[] }>(Endpoints.blog, {
        params: {
          "filters[seq][$gt]": seq,
          "sort": ["seq:asc"],
          "pagination[pageSize]": 1,
          "fields": this.listFields
        }
      }).then(it => it.data.data[0]);

    return prev || this.defaultPrevOrNext;
  };

  public getPrevOf = async (seq: number): Promise<BlogArticleListStrapi> => {
    const next: BlogArticleListStrapi | undefined =
      await this.axios.get<{ data: BlogArticleListStrapi[] }>(Endpoints.blog, {
        params: {
          "filters[seq][$lt]": seq,
          "sort": ["seq:desc"],
          "pagination[pageSize]": 1,
          "fields": this.listFields
        }
      }).then(it => it.data.data[0]);

    return next || this.defaultPrevOrNext;
  };
}
