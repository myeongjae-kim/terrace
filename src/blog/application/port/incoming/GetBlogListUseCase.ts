import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {BlogArticleListResponse} from "../../../domain/BlogArticleListResponse";

export interface GetBlogListUseCase {
  getList(page: number): Promise<StrapiResponse<BlogArticleListResponse>>
}
