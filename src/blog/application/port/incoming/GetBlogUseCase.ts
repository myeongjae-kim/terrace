import {BlogArticleDetailResponse} from "../../../domain/BlogArticleDetailResponse";

export interface GetBlogUseCase {
  getBySlug(slug: string): Promise<BlogArticleDetailResponse>
}
