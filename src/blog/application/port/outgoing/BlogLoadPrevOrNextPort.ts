import { BlogArticleListRemoteResponse } from "./BlogLoadPort";

export interface BlogLoadPrevOrNextPort {
  getPrevOf(seq: number): Promise<BlogArticleListRemoteResponse>
  getNextOf(seq: number): Promise<BlogArticleListRemoteResponse>
}
