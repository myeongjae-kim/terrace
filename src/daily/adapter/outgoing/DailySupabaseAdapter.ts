import { StrapiResponse } from "../../../common/domain/StrapiResponse";
import RepositoryError from "../../../common/exception/RepositoryError";
import { DailyLoadSupabasePort } from "src/daily/application/port/outgoing/DailyLoadSupabasePort";
import { getPagination } from "../../../common/domain/getPagination";
import { DailyListSupabase } from "../../application/port/outgoing/DailyListSupabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { DailySupabase } from "../../application/port/outgoing/DailySupabase";

export class DailySupabaseAdapter implements DailyLoadSupabasePort {

  constructor(private readonly supabase: SupabaseClient<any, "public", any>) {
  }

  public findAll = async (page: number): Promise<StrapiResponse<DailyListSupabase>> => {
    const pageSize = 20;
    const {from, to} = getPagination(page, pageSize);
    const { data: dailies, count, error } = await this.supabase
      .from("dailies")
      .select("id,seq,title,slug,created_at,updated_at", {count: "exact"})
      .order("seq", { ascending: false })
      .not("published_at", "is", null)
      .range(from, to);

    if (dailies === null || count === null) {
      throw RepositoryError.of(error as any);
    }

    return {
      data: dailies as DailyListSupabase[],
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

  public getBySlug = async (slug: string): Promise<DailySupabase> => {
    const { data: dailies, error } = await this.supabase
      .from("dailies")
      .select("*")
      .eq("slug", slug)
      .not("published_at", "is", null);

    if (dailies === null || dailies.length === 0) {
      throw RepositoryError.of(error as any);
    }

    return dailies[0] as DailySupabase;
  };
}
