import RepositoryError from "../../../common/exception/RepositoryError";
import {
  BlogArticleDetailSupabaseResponse,
  BlogLoadSupabasePort
} from "../../application/port/outgoing/BlogLoadSupabasePort";
import { SupabaseClient } from "@supabase/supabase-js";

export class BlogSupabaseAdapter
  implements BlogLoadSupabasePort
{
  constructor(private readonly supabase: SupabaseClient<any, "public", any>) {}

  public getBySlug = async (slug: string): Promise<BlogArticleDetailSupabaseResponse> => {
    const { data: blog_articles, error } = await this.supabase
      .from("blog_articles")
      .select("*")
      .eq("slug", slug);

    if (blog_articles === null || blog_articles.length === 0) {
      throw RepositoryError.of(error as any);
    }

    return blog_articles[0] as BlogArticleDetailSupabaseResponse;
  };
}
