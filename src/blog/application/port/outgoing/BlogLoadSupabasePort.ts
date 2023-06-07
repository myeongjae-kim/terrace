import { BlogArticleDetailResponse } from "../../../domain/BlogArticleDetailResponse";
import { Response } from "../../../../common/domain/Response";

export type BlogArticleDetailSupabaseResponse = Omit<BlogArticleDetailResponse, "prev" | "next" | "createdAt" | "updatedAt"> & {
  created_at: string;
  updated_at: string;
};

export type BlogArticleListSupabaseResponse = Omit<BlogArticleDetailSupabaseResponse, "content">;

export interface BlogLoadSupabasePort {
  getBySlug(slug: string): Promise<BlogArticleDetailSupabaseResponse>
  findAll(page: number): Promise<Response<BlogArticleListSupabaseResponse>>
}
