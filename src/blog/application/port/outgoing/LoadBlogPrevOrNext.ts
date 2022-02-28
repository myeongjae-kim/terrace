import {BlogArticleListStrapi} from "src/blog/application/port/outgoing/BlogArticleListStrapi";

export interface BlogLoadPrevOrNextPort {
  getPrevOf(seq: number): Promise<BlogArticleListStrapi>
  getNextOf(seq: number): Promise<BlogArticleListStrapi>
}
