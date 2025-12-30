import { BeanConfig } from 'inversify-typesafe-spring-like';
import { AboutPersistenceAdapter } from '../about/adapter/out/persistence/AboutPersistenceAdapter';
import { AboutService } from '../about/application/AboutService';
import { GetAboutUseCase } from '../about/application/port/in/GetAboutUseCase';
import { LoadAboutPort } from '../about/application/port/out/LoadAboutPort';
import { ArticleCommandAdapter } from '../articles/adapter/out/persistence/ArticleCommandAdapter';
import { ArticleQueryAdapter } from '../articles/adapter/out/persistence/ArticleQueryAdapter';
import { ArticleCommandService } from '../articles/application/ArticleCommandService';
import { ArticleQueryService } from '../articles/application/ArticleQueryService';
import { CreateArticleUseCase } from '../articles/application/port/in/CreateArticleUseCase';
import { FindAllArticlesUseCase } from '../articles/application/port/in/FindAllArticlesUseCase';
import { GetArticleBySlugUseCase } from '../articles/application/port/in/GetArticleBySlugUseCase';
import { GetNextArticleUseCase } from '../articles/application/port/in/GetNextArticleUseCase';
import { GetNextSeqOfArticleUseCase } from '../articles/application/port/in/GetNextSeqOfArticleUseCase';
import { GetPrevArticleUseCase } from '../articles/application/port/in/GetPrevArticleUseCase';
import { PublishArticleUseCase } from '../articles/application/port/in/PublishArticleUseCase';
import { UnpublishArticleUseCase } from '../articles/application/port/in/UnpublishArticleUseCase';
import { UpdateArticleUseCase } from '../articles/application/port/in/UpdateArticleUseCase';
import { ArticleCommandPort } from '../articles/application/port/out/ArticleCommandPort';
import { ArticleQueryPort } from '../articles/application/port/out/ArticleQueryPort';
import { MusingPersistenceAdapter } from '../musings/adapter/MusingPersistenceAdapters';
import { MusingQueryService } from '../musings/application/MusingQueryService';
import { FindAllMusingsUseCase } from '../musings/application/port/in/FindAllMusingsUseCase';
import { MusingQueryPort } from '../musings/application/port/out/MusingQueryPort';

export type Beans = {
  // About
  GetAboutUseCase: GetAboutUseCase;
  LoadAboutPort: LoadAboutPort;

  // Article Command
  CreateArticleUseCase: CreateArticleUseCase;
  PublishArticleUseCase: PublishArticleUseCase;
  UnpublishArticleUseCase: UnpublishArticleUseCase;
  UpdateArticleUseCase: UpdateArticleUseCase;

  // Article Query
  FindAllArticlesUseCase: FindAllArticlesUseCase;
  GetArticleBySlugUseCase: GetArticleBySlugUseCase;
  GetNextArticleUseCase: GetNextArticleUseCase;
  GetNextSeqOfArticleUseCase: GetNextSeqOfArticleUseCase;
  GetPrevArticleUseCase: GetPrevArticleUseCase;

  // Article Out Port
  ArticleCommandPort: ArticleCommandPort;
  ArticleQueryPort: ArticleQueryPort;

  // Musing
  FindAllMusingsUseCase: FindAllMusingsUseCase;
  MusingQueryPort: MusingQueryPort;
};

export const beanConfig: BeanConfig<Beans> = {
  GetAboutUseCase: (bind) => bind.to(AboutService),
  LoadAboutPort: (bind) => bind.to(AboutPersistenceAdapter),

  // Article Command
  CreateArticleUseCase: (bind) => bind.to(ArticleCommandService),
  PublishArticleUseCase: (bind) => bind.to(ArticleCommandService),
  UnpublishArticleUseCase: (bind) => bind.to(ArticleCommandService),
  UpdateArticleUseCase: (bind) => bind.to(ArticleCommandService),

  // Article Query
  FindAllArticlesUseCase: (bind) => bind.to(ArticleQueryService),
  GetArticleBySlugUseCase: (bind) => bind.to(ArticleQueryService),
  GetNextArticleUseCase: (bind) => bind.to(ArticleQueryService),
  GetNextSeqOfArticleUseCase: (bind) => bind.to(ArticleQueryService),
  GetPrevArticleUseCase: (bind) => bind.to(ArticleQueryService),

  // Article Out Port
  ArticleCommandPort: (bind) => bind.to(ArticleCommandAdapter),
  ArticleQueryPort: (bind) => bind.to(ArticleQueryAdapter),

  // Musing
  FindAllMusingsUseCase: (bind) => bind.to(MusingQueryService),
  MusingQueryPort: (bind) => bind.to(MusingPersistenceAdapter),
};
