import { AsyncContainerModule, Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import { MusingRepository } from 'src/musings/domain/model';
import { createMusingRepositoryImpl } from 'src/musings/infrastructure/repositories';
import { getDbConnection } from './db';

const bindings = new AsyncContainerModule(async (bind) => {
  await require("src/common/api/CommonController");
  await require("src/mother/api/MotherController");

  await require("src/about/api/AboutController");
  await require("src/blog/api/BlogController");
  await require("src/daily/api/DailyController");
  await require("src/musings/api/MusingsController");
  await require("src/places/api/PlacesController");

  await getDbConnection();

  bind<NextApplication>(TYPES.NextApplication)
    .to(NextApplication);

  bind<MusingRepository>(TYPES.MusingRepository)
    .toDynamicValue(createMusingRepositoryImpl)
    .inRequestScope();
})

export const createInversifyContainer = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  return container;
}
