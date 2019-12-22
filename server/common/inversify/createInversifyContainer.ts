import { Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import "src/common/api/CommonController";
import "src/mother/api/MotherController";

import "src/about/api/AboutController";
import "src/blog/api/BlogController";
import "src/daily/api/DailyController";
import "src/musings/api/MusingsController";
import "src/places/api/PlacesController";

export const createInversifyContainer = () => {
  const container = new Container();
  container.bind<NextApplication>(TYPES.NextApplication).to(NextApplication);
  return container;
}