import {Container, decorate, inject, injectable} from "inversify";
import * as axiosModule from "../../infrastructure/remote-call/inversify";
import {MusingPersistenceAdapter} from "./outgoing/MusingPersistenceAdapter";
import {MusingService} from "../application/MusingService";

const TYPES = {
  MusingPersistenceAdapterId: Symbol.for("MusingPersistenceAdapter"),
  MusingFindAllUseCaseId: Symbol.for("MusingFindAllUseCase"),
};

export const { MusingFindAllUseCaseId } = TYPES;

export const decorateClasses = () => {
  decorate(injectable(), MusingPersistenceAdapter);
  decorate(inject(axiosModule.AxiosId), MusingPersistenceAdapter, 0);

  decorate(injectable(), MusingService);
  decorate(inject(TYPES.MusingPersistenceAdapterId), MusingService, 0);
};

export const bind = (container: Container) => {
  container.bind(TYPES.MusingPersistenceAdapterId).to(MusingPersistenceAdapter);
  container.bind(TYPES.MusingFindAllUseCaseId).to(MusingService);
};
