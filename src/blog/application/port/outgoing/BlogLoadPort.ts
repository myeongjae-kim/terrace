import {BlogArticleStrapi} from "src/blog/application/port/outgoing/BlogArticleStrapi";
import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {BlogArticleListStrapi} from "src/blog/application/port/outgoing/BlogArticleListStrapi";

export interface BlogLoadPort {
  getBySlug(slug: string): Promise<BlogArticleStrapi>
  findAll(page: number): Promise<StrapiResponse<BlogArticleListStrapi>>
}
