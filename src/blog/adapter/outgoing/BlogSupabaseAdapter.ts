import RepositoryError from "../../../common/exception/RepositoryError";
import {
  BlogArticleDetailSupabaseResponse,
  BlogArticleListSupabaseResponse,
  BlogLoadSupabasePort
} from "../../application/port/outgoing/BlogLoadSupabasePort";
import { SupabaseClient } from "@supabase/supabase-js";
import { Response } from "src/common/domain/Response";
import { getPagination } from "../../../common/domain/getPagination";
import { BlogLoadPrevOrNextSupabasePort } from "../../application/port/outgoing/BlogLoadPrevOrNextSupabasePort";

export class BlogSupabaseAdapter
  implements BlogLoadSupabasePort, BlogLoadPrevOrNextSupabasePort {
  constructor(private readonly supabase: SupabaseClient<any, "public", any>) {
  }

  private readonly defaultPrevOrNext: BlogArticleListSupabaseResponse = {
    id: -1,
    seq: -1,
    created_at: "",
    updated_at: "",
    slug: "",
    title: "",
  };

  public getBySlug = async (slug: string): Promise<BlogArticleDetailSupabaseResponse> => {
    const { data: blog_articles, error } = await this.supabase
      .from("blog_articles")
      .select("*")
      .eq("slug", slug)
      .not("published_at", "is", null);

    if (blog_articles === null || blog_articles.length === 0) {
      throw RepositoryError.of(error as any);
    }

    return blog_articles[0] as BlogArticleDetailSupabaseResponse;
  };

  public findAll = async (page: number): Promise<Response<BlogArticleListSupabaseResponse>> => {
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
      data: blog_articles as BlogArticleListSupabaseResponse[],
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

  public getNextOf = async (seq: number): Promise<BlogArticleListSupabaseResponse> => {
    const {data} = await this.supabase
      .from("blog_articles")
      .select("id,seq,title,slug,created_at,updated_at")
      .order("seq", { ascending: true })
      .gt("seq", seq)
      .not("published_at", "is", null)
      .range(0, 0);

    return (data?.[0] || this.defaultPrevOrNext) as BlogArticleListSupabaseResponse;
  };

  public getPrevOf = async (seq: number): Promise<BlogArticleListSupabaseResponse> => {
    const {data} = await this.supabase
      .from("blog_articles")
      .select("id,seq,title,slug,created_at,updated_at")
      .order("seq", { ascending: false })
      .lt("seq", seq)
      .not("published_at", "is", null)
      .range(0, 0);

    return (data?.[0] || this.defaultPrevOrNext) as BlogArticleListSupabaseResponse;
  };
}
