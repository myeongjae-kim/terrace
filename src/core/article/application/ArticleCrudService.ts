import { Autowired } from "#/core/config/Autowired";
import type { ArticleCrudUseCase } from "./port/in/ArticleCrudUseCase";
import type { ArticleCommandPort } from "./port/out/ArticleCommandPort";
import type { ArticleQueryPort } from "./port/out/ArticleQueryPort";

export class ArticleCrudService implements ArticleCrudUseCase {
  constructor(
    @Autowired("ArticleCommandPort")
    private readonly articleCommandPort: ArticleCommandPort,
    @Autowired("ArticleQueryPort")
    private readonly articleQueryPort: ArticleQueryPort,
  ) {}

  create(input: Parameters<ArticleCrudUseCase["create"]>[0]) {
    return this.articleCommandPort.create(input);
  }

  get(input: Parameters<ArticleCrudUseCase["get"]>[0]) {
    return this.articleQueryPort.get(input);
  }

  list(input?: Parameters<ArticleCrudUseCase["list"]>[0]) {
    return this.articleQueryPort.list(input);
  }

  update(input: Parameters<ArticleCrudUseCase["update"]>[0]) {
    return this.articleCommandPort.update(input);
  }

  delete(input: Parameters<ArticleCrudUseCase["delete"]>[0]) {
    return this.articleCommandPort.delete(input);
  }
}
