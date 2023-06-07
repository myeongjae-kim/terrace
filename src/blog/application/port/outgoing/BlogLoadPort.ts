import { BlogArticleDetailResponse } from "../../../domain/BlogArticleDetailResponse";
import { Response } from "../../../../common/domain/Response";

export type BlogArticleDetailRemoteResponse = Omit<BlogArticleDetailResponse, "prev" | "next" | "createdAt" | "updatedAt"> & {
  created_at: string;
  updated_at: string;
};

export type BlogArticleListRemoteResponse = Omit<BlogArticleDetailRemoteResponse, "content">;

export interface BlogLoadPort {
  getBySlug(slug: string): Promise<BlogArticleDetailRemoteResponse>
  findAll(page: number): Promise<Response<BlogArticleListRemoteResponse>>
}
