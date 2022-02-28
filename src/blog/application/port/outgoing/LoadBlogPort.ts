import {BlogArticleStrapi} from "src/blog/adapter/outgoing/BlogArticleStrapi";
import {StrapiResponse} from "../../../../common/domain/StrapiResponse";
import {BlogArticleListStrapi} from "src/blog/adapter/outgoing/BlogArticleListStrapi";

export interface LoadBlogPort {
  getBySlug(slug: string): Promise<BlogArticleStrapi>
  findAll(page: number): Promise<StrapiResponse<BlogArticleListStrapi>>
}
