import {LoadBlogPort} from "src/blog/application/port/outgoing/LoadBlogPort";
import {LoadBlogPrevOrNextPort} from "src/blog/application/port/outgoing/LoadBlogPrevOrNext";
import {StrapiResponse} from "../../../view/common/api/dto/StrapiResponse";
import Axios from "axios";
import {API_HOST, Endpoints} from "../../../view/common/constants/Constants";
import RepositoryError from "../../../view/common/domain/model/RepositoryError";
import {BlogArticleListStrapi} from "./BlogArticleListStrapi";
import {BlogArticleStrapi} from "./BlogArticleStrapi";

export class BlogPersistenceAdapter implements LoadBlogPort, LoadBlogPrevOrNextPort {
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
    Axios.get<StrapiResponse<BlogArticleListStrapi>>(`${API_HOST}${Endpoints.blog}`, {
      params: {
        fields: this.listFields,
        sort: ["seq:desc"],
        "pagination[page]": page,
        "pagination[pageSize]": 10
      }
    }).then(it => it.data);

  public getBySlug = async (slug: string): Promise<BlogArticleStrapi> => {
    const article: BlogArticleStrapi | undefined =
      await Axios.get<{ data: BlogArticleStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
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
      await Axios.get<{ data: BlogArticleListStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
        params: {
          "filters[seq][$lt]": seq,
          "sort": ["seq:desc"],
          "pagination[pageSize]": 1,
          "fields": this.listFields
        }
      }).then(it => it.data.data[0]);

    return prev || this.defaultPrevOrNext;
  };

  public getPrevOf = async (seq: number): Promise<BlogArticleListStrapi> => {
    const next: BlogArticleListStrapi | undefined =
      await Axios.get<{ data: BlogArticleListStrapi[] }>(`${API_HOST}${Endpoints.blog}`, {
        params: {
          "filters[seq][$lt]": seq,
          "sort": ["seq:asc"],
          "pagination[pageSize]": 1,
          "fields": this.listFields
        }
      }).then(it => it.data.data[0]);

    return next || this.defaultPrevOrNext;
  };
}
