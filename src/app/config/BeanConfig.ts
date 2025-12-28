import type { Newable } from 'inversify';
import { AboutPersistenceAdapter } from '../about/adapter/out/persistence/AboutPersistenceAdapter';
import { AboutService } from '../about/application/AboutService';
import { GetAboutUseCase } from '../about/application/port/in/GetAboutUseCase';
import { LoadAboutPort } from '../about/application/port/out/LoadAboutPort';

export type BeanNames = {
  GetAboutUseCase: GetAboutUseCase;
  LoadAboutPort: LoadAboutPort;
};

export const beanConfig: Record<keyof BeanNames, Newable<unknown>> = {
  GetAboutUseCase: AboutService,
  LoadAboutPort: AboutPersistenceAdapter,
};
