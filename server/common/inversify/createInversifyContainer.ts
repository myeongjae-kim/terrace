import { AsyncContainerModule, Container, interfaces } from 'inversify';
import next from 'next';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import { getDbConnection } from './db';

import { MusingRepository } from 'src/musings/domain/model';
import { MusingService, MusingServiceImpl } from 'src/musings/domain/service';
import { createMusingRepositoryImpl } from 'src/musings/infrastructure/model';

import { DailyRepository } from 'src/daily/domain/model';
import { DailyService, DailyServiceImpl } from 'src/daily/domain/service';
import { createDailyRepositoryImpl } from 'src/daily/infrastructure/model';

import { UserRepository } from 'src/auth/domain/model';
import { AuthService, AuthServiceImpl } from 'src/auth/domain/service';
import { createUserRepositoryImpl } from 'src/auth/infrastructure/model';

import { BlogArticleRepository } from 'src/blog/domain/model';
import { BlogArticleService, BlogArticleServiceImpl } from 'src/blog/domain/service';
import { createBlogArticleRepositoryImpl } from 'src/blog/infrastructure/model';

import { CacheRenderingService } from 'src/common/domain/service';
import { CacheRenderingServiceImpl } from 'src/common/infrastructure/service';

import "src/common/api/CommonController";

import "src/auth/api/AuthController";

import "src/about/api/AboutController";
import "src/blog/api/BlogController";
import "src/daily/api/DailyController";
import "src/musings/api/MusingsController";
import "src/places/api/PlacesController";

export const createInversifyContainer = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  return container;
}

const bindings = new AsyncContainerModule(async (bind) => {
  await getDbConnection();
  await bindNextApplication(bind);

  bindAuth(bind);
  bindBlog(bind);
  bindMusings(bind);
  bindDaily(bind);
})

const bindNextApplication = async (bind: interfaces.Bind) => {
  const cacheRenderingService: CacheRenderingService = new CacheRenderingServiceImpl();
  bindCacheRenderingService(bind, cacheRenderingService);

  const app = next({ dev: process.env.NODE_ENV !== 'production' });
  await app.prepare();
  const nextApplication = new NextApplication(
    cacheRenderingService,
    app
  );

  bind<NextApplication>(TYPES.NextApplication)
    .toConstantValue(nextApplication);
}

const bindCacheRenderingService = (bind: interfaces.Bind, cacheRenderingService: CacheRenderingService) => {
  bind<CacheRenderingService>(TYPES.CacheRenderingService)
    .toConstantValue(cacheRenderingService);
}

const bindAuth = (bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository)
    .toDynamicValue(createUserRepositoryImpl)
    .inRequestScope();

  bind<AuthService>(TYPES.AuthService)
    .to(AuthServiceImpl);
}

const bindBlog = (bind: interfaces.Bind) => {
  bind<BlogArticleRepository>(TYPES.BlogArticleRepository)
    .toDynamicValue(createBlogArticleRepositoryImpl)
    .inRequestScope();

  bind<BlogArticleService>(TYPES.BlogArticleService)
    .to(BlogArticleServiceImpl);
}

const bindMusings = (bind: interfaces.Bind) => {
  bind<MusingRepository>(TYPES.MusingRepository)
    .toDynamicValue(createMusingRepositoryImpl)
    .inRequestScope();

  bind<MusingService>(TYPES.MusingService)
    .to(MusingServiceImpl);
}

const bindDaily = (bind: interfaces.Bind) => {
  bind<DailyRepository>(TYPES.DailyRepository)
    .toDynamicValue(createDailyRepositoryImpl)
    .inRequestScope();

  bind<DailyService>(TYPES.DailyService)
    .to(DailyServiceImpl);
}