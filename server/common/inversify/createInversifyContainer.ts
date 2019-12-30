import { AsyncContainerModule, Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import { getDbConnection } from './db';

import { MusingRepository } from 'src/musings/domain/model';
import { MusingService, MusingServiceImpl } from 'src/musings/domain/service';
import { createMusingRepositoryImpl } from 'src/musings/infrastructure/model';

import { DailyRepository } from 'src/daily/domain/model';
import { DailyService, DailyServiceImpl } from 'src/daily/domain/service';
import { createDailyRepositoryImpl } from 'src/daily/infrastructure/model';

import { BlogArticleRepository } from 'src/blog/domain/model';
import { BlogArticleService, BlogArticleServiceImpl } from 'src/blog/domain/service';
import { createBlogArticleRepositoryImpl } from 'src/blog/infrastructure/model';

import "src/common/api/CommonController";
import "src/mother/api/MotherController";

import "src/about/api/AboutController";
import "src/blog/api/BlogController";
import "src/daily/api/DailyController";
import "src/musings/api/MusingsController";
import "src/places/api/PlacesController";

const bindings = new AsyncContainerModule(async (bind) => {

  await getDbConnection();

  bind<NextApplication>(TYPES.NextApplication)
    .to(NextApplication);

  bind<BlogArticleRepository>(TYPES.BlogArticleRepository)
    .toDynamicValue(createBlogArticleRepositoryImpl)
    .inRequestScope();

  bind<BlogArticleService>(TYPES.BlogArticleService)
    .to(BlogArticleServiceImpl);

  bind<MusingRepository>(TYPES.MusingRepository)
    .toDynamicValue(createMusingRepositoryImpl)
    .inRequestScope();

  bind<MusingService>(TYPES.MusingService)
    .to(MusingServiceImpl);

  bind<DailyRepository>(TYPES.DailyRepository)
    .toDynamicValue(createDailyRepositoryImpl)
    .inRequestScope();

  bind<DailyService>(TYPES.DailyService)
    .to(DailyServiceImpl);
})

export const createInversifyContainer = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  return container;
}
