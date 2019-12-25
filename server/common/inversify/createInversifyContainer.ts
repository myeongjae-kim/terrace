import { AsyncContainerModule, Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

const bindings = new AsyncContainerModule(async (bind) => {
  await require("src/common/api/CommonController");
  await require("src/mother/api/MotherController");

  await require("src/about/api/AboutController");
  await require("src/blog/api/BlogController");
  await require("src/daily/api/DailyController");
  await require("src/musings/api/MusingsController");
  await require("src/places/api/PlacesController");

  bind<NextApplication>(TYPES.NextApplication).to(NextApplication);
})

export const createInversifyContainer = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  return container;
}