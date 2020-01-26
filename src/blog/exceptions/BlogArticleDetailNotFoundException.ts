import { BlogArticlePathDto } from "../api";

export class BlogArticleDetailNotFoundException extends Error {
  public constructor(req: BlogArticlePathDto) {
    super("A blog article has not been found by request: " + JSON.stringify(req));
  }
}