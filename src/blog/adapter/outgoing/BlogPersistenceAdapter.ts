import { BlogLoadPrevOrNextPort } from "src/blog/application/port/outgoing/LoadBlogPrevOrNext";
import { AxiosInstance } from "axios";
import { Endpoints } from "../../../common/constants/Constants";
import { BlogArticleListStrapi } from "../../application/port/outgoing/BlogArticleListStrapi";

export class BlogPersistenceAdapter implements BlogLoadPrevOrNextPort
{
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
    },
  };

  public getNextOf = async (seq: number): Promise<BlogArticleListStrapi> => {
    const prev: BlogArticleListStrapi | undefined = await this.axios
      .get<{ data: BlogArticleListStrapi[] }>(Endpoints.blog, {
        params: {
          "filters[seq][$gt]": seq,
          sort: ["seq:asc"],
          "pagination[pageSize]": 1,
          fields: this.listFields,
        },
      })
      .then((it) => it.data.data[0]);

    return prev || this.defaultPrevOrNext;
  };

  public getPrevOf = async (seq: number): Promise<BlogArticleListStrapi> => {
    const next: BlogArticleListStrapi | undefined = await this.axios
      .get<{ data: BlogArticleListStrapi[] }>(Endpoints.blog, {
        params: {
          "filters[seq][$lt]": seq,
          sort: ["seq:desc"],
          "pagination[pageSize]": 1,
          fields: this.listFields,
        },
      })
      .then((it) => it.data.data[0]);

    return next || this.defaultPrevOrNext;
  };
}
