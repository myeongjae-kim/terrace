import { Autowired } from "#/core/config/Autowired";
import type { GetPublishedArticleBySlugUseCase } from "./port/in/GetPublishedArticleBySlugUseCase";
import type { ListPublishedArticlesUseCase } from "./port/in/ListPublishedArticlesUseCase";
import type { ArticleQueryPort } from "./port/out/ArticleQueryPort";

export class ArticlePublishedQueryService
  implements ListPublishedArticlesUseCase, GetPublishedArticleBySlugUseCase
{
  constructor(
    @Autowired("ArticleQueryPort")
    private readonly articleQueryPort: ArticleQueryPort,
  ) {}

  list(input: Parameters<ListPublishedArticlesUseCase["list"]>[0]) {
    return this.articleQueryPort.listPublished(input);
  }

  getBySlug(
    input: Parameters<GetPublishedArticleBySlugUseCase["getBySlug"]>[0],
  ) {
    return this.articleQueryPort.getPublishedBySlug(input);
  }
}
