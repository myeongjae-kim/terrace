import RepositoryError from "../../../common/exception/RepositoryError";
import {
  BlogArticleDetailRemoteResponse,
  BlogArticleListRemoteResponse,
  BlogLoadPort
} from "../../application/port/outgoing/BlogLoadPort";
import { SupabaseClient } from "@supabase/supabase-js";
import { Response } from "src/common/domain/Response";
import { getPagination } from "../../../common/domain/getPagination";
import { BlogLoadPrevOrNextPort } from "../../application/port/outgoing/BlogLoadPrevOrNextPort";

export class BlogPersistenceAdapter
  implements BlogLoadPort, BlogLoadPrevOrNextPort {
  constructor(private readonly supabase: SupabaseClient<any, "public", any>) {
  }

  private readonly defaultPrevOrNext: BlogArticleListRemoteResponse = {
    id: -1,
    seq: -1,
    created_at: "",
    updated_at: "",
    slug: "",
    title: "",
  };

  public getBySlug = async (slug: string): Promise<BlogArticleDetailRemoteResponse> => {
    const { data: blog_articles, error } = await this.supabase
      .from("blog_articles")
      .select("*")
      .eq("slug", slug)
      .not("published_at", "is", null);

    if (blog_articles === null || blog_articles.length === 0) {
      throw RepositoryError.of(error as any);
    }

    return blog_articles[0] as BlogArticleDetailRemoteResponse;
  };

  public findAll = async (page: number): Promise<Response<BlogArticleListRemoteResponse>> => {
    const pageSize = 10;
    const {from, to} = getPagination(page, pageSize);
    const { data: blog_articles, count, error } = await this.supabase
      .from("blog_articles")
      .select("id,seq,title,slug,created_at,updated_at", {count: "exact"})
      .order("seq", { ascending: false })
      .not("published_at", "is", null)
      .range(from, to);

    if (blog_articles === null || count === null) {
      throw RepositoryError.of(error as any);
    }

    return {
      data: blog_articles as BlogArticleListRemoteResponse[],
      meta:{
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(count / pageSize),
          total: count
        }
      }
    };
  };

  public getNextOf = async (seq: number): Promise<BlogArticleListRemoteResponse> => {
    const {data} = await this.supabase
      .from("blog_articles")
      .select("id,seq,title,slug,created_at,updated_at")
      .order("seq", { ascending: true })
      .gt("seq", seq)
      .not("published_at", "is", null)
      .range(0, 0);

    return (data?.[0] || this.defaultPrevOrNext) as BlogArticleListRemoteResponse;
  };

  public getPrevOf = async (seq: number): Promise<BlogArticleListRemoteResponse> => {
    const {data} = await this.supabase
      .from("blog_articles")
      .select("id,seq,title,slug,created_at,updated_at")
      .order("seq", { ascending: false })
      .lt("seq", seq)
      .not("published_at", "is", null)
      .range(0, 0);

    return (data?.[0] || this.defaultPrevOrNext) as BlogArticleListRemoteResponse;
  };
}
