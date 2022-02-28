import {BlogAttributes} from "./BlogAttributes";

export interface BlogArticleListStrapi {
  id: number;
  attributes: Omit<BlogAttributes, "content">
}

