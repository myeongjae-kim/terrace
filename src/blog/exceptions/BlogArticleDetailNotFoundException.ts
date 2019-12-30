import { BlogArticleDetailRequestDto } from "../api";

export class BlogArticleDetailNotFoundException extends Error {
  public constructor(req: BlogArticleDetailRequestDto) {
    super("A blog article has not been found by request: " + JSON.stringify(req));
  }
}