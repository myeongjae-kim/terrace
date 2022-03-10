import {Container, injectable, decorate, inject} from "inversify";
import {AboutInMemoryAdapter} from "./outgoing/AboutInMemoryAdapter";
import {AboutService} from "../application/AboutService";

const TYPES = {
  AboutInMemoryAdapterId: Symbol.for("AboutInMemoryAdapter"),
  AboutGetUseCaseId: Symbol.for("AboutGetUseCase"),
};

export const { AboutGetUseCaseId } = TYPES;

export const decorateClasses = () => {
  decorate(injectable(), AboutInMemoryAdapter);
  decorate(injectable(), AboutService);
  decorate(inject(TYPES.AboutInMemoryAdapterId), AboutService, 0);
};

export const bind = (container: Container) => {
  container.bind(TYPES.AboutInMemoryAdapterId).to(AboutInMemoryAdapter);
  container.bind(TYPES.AboutGetUseCaseId).to(AboutService);
};
