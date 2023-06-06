import { BlogArticleDetailResponse } from "../../../domain/BlogArticleDetailResponse";

export type BlogArticleDetailSupabaseResponse = Omit<BlogArticleDetailResponse, "prev" | "next" | "createdAt" | "updatedAt"> & {
  created_at: string;
  updated_at: string;
};

export interface BlogLoadSupabasePort {
  getBySlug(slug: string): Promise<BlogArticleDetailSupabaseResponse>
}
