import type { BeanConfig } from "inversify-typesafe-spring-like";
import { ArticleDrizzleAdapter } from "#/core/article/adapter/ArticleDrizzleAdapter";
import { ArticleCrudService } from "#/core/article/application/ArticleCrudService";
import type { ArticleCrudUseCase } from "#/core/article/application/port/in/ArticleCrudUseCase";
import type { ArticleCommandPort } from "#/core/article/application/port/out/ArticleCommandPort";
import type { ArticleQueryPort } from "#/core/article/application/port/out/ArticleQueryPort";
import { MusingsDrizzleAdapter } from "#/core/musings/adapter/MusingsDrizzleAdapter";
import { MusingsCrudService } from "#/core/musings/application/MusingsCrudService";
import type { MusingsCrudUseCase } from "#/core/musings/application/port/in/MusingsCrudUseCase";
import type { MusingsCommandPort } from "#/core/musings/application/port/out/MusingsCommandPort";
import type { MusingsQueryPort } from "#/core/musings/application/port/out/MusingsQueryPort";

export type Beans = {
  ArticleCommandPort: ArticleCommandPort;
  ArticleQueryPort: ArticleQueryPort;
  ArticleCrudUseCase: ArticleCrudUseCase;
  MusingsCommandPort: MusingsCommandPort;
  MusingsQueryPort: MusingsQueryPort;
  MusingsCrudUseCase: MusingsCrudUseCase;
};

export const beanConfig: BeanConfig<Beans> = {
  ArticleCommandPort: (bind) => bind().to(ArticleDrizzleAdapter),
  ArticleQueryPort: (bind) => bind().to(ArticleDrizzleAdapter),
  ArticleCrudUseCase: (bind) => bind().to(ArticleCrudService),
  MusingsCommandPort: (bind) => bind().to(MusingsDrizzleAdapter),
  MusingsQueryPort: (bind) => bind().to(MusingsDrizzleAdapter),
  MusingsCrudUseCase: (bind) => bind().to(MusingsCrudService),
};
