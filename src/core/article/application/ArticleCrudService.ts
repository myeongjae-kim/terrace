import { Autowired } from "#/core/config/Autowired";
import type { CreateArticleUseCase } from "./port/in/CreateArticleUseCase";
import type { DeleteArticleUseCase } from "./port/in/DeleteArticleUseCase";
import type { GetArticleUseCase } from "./port/in/GetArticleUseCase";
import type { ListArticlesUseCase } from "./port/in/ListArticlesUseCase";
import type { UpdateArticleUseCase } from "./port/in/UpdateArticleUseCase";
import type { ArticleCommandPort } from "./port/out/ArticleCommandPort";
import type { ArticleQueryPort } from "./port/out/ArticleQueryPort";

export class ArticleCrudService
  implements
    CreateArticleUseCase,
    GetArticleUseCase,
    ListArticlesUseCase,
    UpdateArticleUseCase,
    DeleteArticleUseCase
{
  constructor(
    @Autowired("ArticleCommandPort")
    private readonly articleCommandPort: ArticleCommandPort,
    @Autowired("ArticleQueryPort")
    private readonly articleQueryPort: ArticleQueryPort,
  ) {}

  create(input: Parameters<CreateArticleUseCase["create"]>[0]) {
    return this.articleCommandPort.create(input);
  }

  get(input: Parameters<GetArticleUseCase["get"]>[0]) {
    return this.articleQueryPort.get(input);
  }

  list(input?: Parameters<ListArticlesUseCase["list"]>[0]) {
    return this.articleQueryPort.list(input);
  }

  update(input: Parameters<UpdateArticleUseCase["update"]>[0]) {
    return this.articleCommandPort.update(input);
  }

  delete(input: Parameters<DeleteArticleUseCase["delete"]>[0]) {
    return this.articleCommandPort.delete(input);
  }
}
