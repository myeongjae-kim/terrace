import {BlogArticleListStrapi} from "src/blog/adapter/outgoing/BlogArticleListStrapi";

export interface LoadBlogPrevOrNextPort {
  getPrevOf(seq: number): Promise<BlogArticleListStrapi>
  getNextOf(seq: number): Promise<BlogArticleListStrapi>
}
