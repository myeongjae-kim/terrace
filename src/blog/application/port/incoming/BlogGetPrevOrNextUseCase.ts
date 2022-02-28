import {BlogArticlePrevOrNext} from "../../../domain/BlogArticleDetailResponse";

export interface BlogGetPrevOrNextUseCase {
  getPrevOf(seq: number): Promise<BlogArticlePrevOrNext>
  getNextOf(seq: number): Promise<BlogArticlePrevOrNext>
}
