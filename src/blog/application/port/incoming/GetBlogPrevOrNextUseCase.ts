import {BlogArticlePrevOrNext} from "../../../domain/BlogArticleDetailResponse";

export interface GetBlogPrevOrNextUseCase {
  getPrevOf(seq: number): Promise<BlogArticlePrevOrNext>
  getNextOf(seq: number): Promise<BlogArticlePrevOrNext>
}
