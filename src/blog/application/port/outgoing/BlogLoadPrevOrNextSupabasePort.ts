import { BlogArticleListSupabaseResponse } from "./BlogLoadSupabasePort";

export interface BlogLoadPrevOrNextSupabasePort {
  getPrevOf(seq: number): Promise<BlogArticleListSupabaseResponse>
  getNextOf(seq: number): Promise<BlogArticleListSupabaseResponse>
}
