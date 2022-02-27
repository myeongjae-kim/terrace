import {StrapiResponse} from "../../../../view/common/api/dto/StrapiResponse";
import {BlogArticleListResponse} from "../../../domain/BlogArticleListResponse";

export interface GetBlogListUseCase {
  getList(page: number): Promise<StrapiResponse<BlogArticleListResponse>>
}
