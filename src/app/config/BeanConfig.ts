import type { Newable } from 'inversify';
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

export type BeanNames = {
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
};

export const beanConfig: Record<keyof BeanNames, Newable<unknown>> = {
  GetAboutUseCase: AboutService,
  LoadAboutPort: AboutPersistenceAdapter,

  // Article Command
  CreateArticleUseCase: ArticleCommandService,
  PublishArticleUseCase: ArticleCommandService,
  UnpublishArticleUseCase: ArticleCommandService,
  UpdateArticleUseCase: ArticleCommandService,

  // Article Query
  FindAllArticlesUseCase: ArticleQueryService,
  GetArticleBySlugUseCase: ArticleQueryService,
  GetNextArticleUseCase: ArticleQueryService,
  GetNextSeqOfArticleUseCase: ArticleQueryService,
  GetPrevArticleUseCase: ArticleQueryService,

  // Article Out Port
  ArticleCommandPort: ArticleCommandAdapter,
  ArticleQueryPort: ArticleQueryAdapter,
};
