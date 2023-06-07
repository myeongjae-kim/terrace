import {Response} from "../../../../common/domain/Response";
import {BlogArticleListResponse} from "../../../domain/BlogArticleListResponse";

export interface BlogFindAllUseCase {
  findAll(page: number): Promise<Response<BlogArticleListResponse>>
}
