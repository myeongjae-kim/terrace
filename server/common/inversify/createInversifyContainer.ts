import { AsyncContainerModule, Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import { MusingRepository } from 'src/musings/domain/model';
import { MusingService } from 'src/musings/domain/service';
import { createMusingRepositoryImpl } from 'src/musings/infrastructure/model';
import { MusingServiceImpl } from 'src/musings/infrastructure/service';
import { getDbConnection } from './db';

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

  bind<MusingRepository>(TYPES.MusingRepository)
    .toDynamicValue(createMusingRepositoryImpl)
    .inRequestScope();

  bind<MusingService>(TYPES.MusingService)
    .to(MusingServiceImpl);
})

export const createInversifyContainer = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  return container;
}
