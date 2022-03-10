import {Container, decorate, inject, injectable} from "inversify";
import * as axiosModule from "../../infrastructure/remote-call/inversify";
import {DailyPersistenceAdapter} from "./outgoing/DailyPersistenceAdapter";
import {DailyService} from "../application/port/DailyService";

const TYPES = {
  DailyPersistenceAdapterId: Symbol.for("DailyPersistenceAdapter"),
  DailyGetUseCaseId: Symbol.for("DailyGetUseCase"),
  DailyFindAllUseCaseId: Symbol.for("DailyFindAllUseCase"),
};

export const { DailyGetUseCaseId, DailyFindAllUseCaseId } = TYPES;

export const decorateClasses = () => {
  decorate(injectable(), DailyPersistenceAdapter);
  decorate(inject(axiosModule.AxiosId), DailyPersistenceAdapter, 0);

  decorate(injectable(), DailyService);
  decorate(inject(TYPES.DailyPersistenceAdapterId), DailyService, 0);
};

export const bind = (container: Container) => {
  container.bind(TYPES.DailyPersistenceAdapterId).to(DailyPersistenceAdapter);
  container.bind(TYPES.DailyGetUseCaseId).to(DailyService);
  container.bind(TYPES.DailyFindAllUseCaseId).to(DailyService);
};
