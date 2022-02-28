import {BlogArticleDetailResponse} from "../../../domain/BlogArticleDetailResponse";

export interface BlogGetUseCase {
  getBySlug(slug: string): Promise<BlogArticleDetailResponse>
}
