import type { BeanConfig } from "inversify-typesafe-spring-like";
import { ArticleDrizzleAdapter } from "#/core/article/adapter/ArticleDrizzleAdapter";
import { ArticleCrudService } from "#/core/article/application/ArticleCrudService";
import { ArticlePublishedQueryService } from "#/core/article/application/ArticlePublishedQueryService";
import type { CreateArticleUseCase } from "#/core/article/application/port/in/CreateArticleUseCase";
import type { DeleteArticleUseCase } from "#/core/article/application/port/in/DeleteArticleUseCase";
import type { GetArticleUseCase } from "#/core/article/application/port/in/GetArticleUseCase";
import type { GetPublishedArticleBySlugUseCase } from "#/core/article/application/port/in/GetPublishedArticleBySlugUseCase";
import type { ListArticlesUseCase } from "#/core/article/application/port/in/ListArticlesUseCase";
import type { ListPublishedArticlesUseCase } from "#/core/article/application/port/in/ListPublishedArticlesUseCase";
import type { UpdateArticleUseCase } from "#/core/article/application/port/in/UpdateArticleUseCase";
import type { ArticleCommandPort } from "#/core/article/application/port/out/ArticleCommandPort";
import type { ArticleQueryPort } from "#/core/article/application/port/out/ArticleQueryPort";
import { MusingsDrizzleAdapter } from "#/core/musings/adapter/MusingsDrizzleAdapter";
import { MusingsCrudService } from "#/core/musings/application/MusingsCrudService";
import { MusingsPublishedQueryService } from "#/core/musings/application/MusingsPublishedQueryService";
import type { CreateMusingUseCase } from "#/core/musings/application/port/in/CreateMusingUseCase";
import type { DeleteMusingUseCase } from "#/core/musings/application/port/in/DeleteMusingUseCase";
import type { GetMusingUseCase } from "#/core/musings/application/port/in/GetMusingUseCase";
import type { ListMusingsUseCase } from "#/core/musings/application/port/in/ListMusingsUseCase";
import type { ListPublishedMusingsUseCase } from "#/core/musings/application/port/in/ListPublishedMusingsUseCase";
import type { UpdateMusingUseCase } from "#/core/musings/application/port/in/UpdateMusingUseCase";
import type { MusingsCommandPort } from "#/core/musings/application/port/out/MusingsCommandPort";
import type { MusingsQueryPort } from "#/core/musings/application/port/out/MusingsQueryPort";

export type Beans = {
  ArticleCommandPort: ArticleCommandPort;
  ArticleQueryPort: ArticleQueryPort;
  CreateArticleUseCase: CreateArticleUseCase;
  GetArticleUseCase: GetArticleUseCase;
  ListArticlesUseCase: ListArticlesUseCase;
  ListPublishedArticlesUseCase: ListPublishedArticlesUseCase;
  GetPublishedArticleBySlugUseCase: GetPublishedArticleBySlugUseCase;
  UpdateArticleUseCase: UpdateArticleUseCase;
  DeleteArticleUseCase: DeleteArticleUseCase;
  MusingsCommandPort: MusingsCommandPort;
  MusingsQueryPort: MusingsQueryPort;
  CreateMusingUseCase: CreateMusingUseCase;
  GetMusingUseCase: GetMusingUseCase;
  ListMusingsUseCase: ListMusingsUseCase;
  ListPublishedMusingsUseCase: ListPublishedMusingsUseCase;
  UpdateMusingUseCase: UpdateMusingUseCase;
  DeleteMusingUseCase: DeleteMusingUseCase;
};

export const beanConfig: BeanConfig<Beans> = {
  ArticleCommandPort: (bind) => bind().to(ArticleDrizzleAdapter),
  ArticleQueryPort: (bind) => bind().to(ArticleDrizzleAdapter),
  CreateArticleUseCase: (bind) => bind().to(ArticleCrudService),
  GetArticleUseCase: (bind) => bind().to(ArticleCrudService),
  ListArticlesUseCase: (bind) => bind().to(ArticleCrudService),
  ListPublishedArticlesUseCase: (bind) =>
    bind().to(ArticlePublishedQueryService),
  GetPublishedArticleBySlugUseCase: (bind) =>
    bind().to(ArticlePublishedQueryService),
  UpdateArticleUseCase: (bind) => bind().to(ArticleCrudService),
  DeleteArticleUseCase: (bind) => bind().to(ArticleCrudService),
  MusingsCommandPort: (bind) => bind().to(MusingsDrizzleAdapter),
  MusingsQueryPort: (bind) => bind().to(MusingsDrizzleAdapter),
  CreateMusingUseCase: (bind) => bind().to(MusingsCrudService),
  GetMusingUseCase: (bind) => bind().to(MusingsCrudService),
  ListMusingsUseCase: (bind) => bind().to(MusingsCrudService),
  ListPublishedMusingsUseCase: (bind) =>
    bind().to(MusingsPublishedQueryService),
  UpdateMusingUseCase: (bind) => bind().to(MusingsCrudService),
  DeleteMusingUseCase: (bind) => bind().to(MusingsCrudService),
};
