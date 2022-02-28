import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {BlogArticleListResponse} from "../../../domain/BlogArticleListResponse";

export interface BlogFindAllUseCase {
  findAll(page: number): Promise<StrapiResponse<BlogArticleListResponse>>
}
