import { MusingLoadPort } from "../../application/port/outgoing/MusingLoadPort";
import { MusingStrapi } from "../../application/port/outgoing/MusingStrapi";
import { SupabaseClient } from "@supabase/supabase-js";
import RepositoryError from "../../../common/exception/RepositoryError";

export class MusingPersistenceAdapter implements MusingLoadPort {

  constructor(private readonly supabase: SupabaseClient<any, "public", any>) {
  }

  public findAll = async (): Promise<MusingStrapi[]> => {
    const { data: musings, error } = await this.supabase
      .from("musings")
      .select("id,seq,created_at,updated_at,quote,from,language")
      .order("seq", { ascending: true })
      .not("published_at", "is", null);

    if (musings === null) {
      throw RepositoryError.of(error as any);
    }

    return musings as MusingStrapi[];
  };
}
