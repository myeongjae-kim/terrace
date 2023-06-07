import { Container, decorate, inject, injectable } from "inversify";
import * as axiosModule from "../../infrastructure/remote-call/inversify";
import { DailyService } from "../application/port/DailyService";
import { DailySupabaseAdapter } from "./outgoing/DailySupabaseAdapter";

const TYPES = {
  DailySupabaseAdapterId: Symbol.for("DailySupabaseAdapter"),
  DailyGetUseCaseId: Symbol.for("DailyGetUseCase"),
  DailyFindAllUseCaseId: Symbol.for("DailyFindAllUseCase"),
};

export const { DailyGetUseCaseId, DailyFindAllUseCaseId } = TYPES;

export const decorateClasses = () => {
  decorate(injectable(), DailySupabaseAdapter);
  decorate(inject(axiosModule.SupabaseId), DailySupabaseAdapter, 0);

  decorate(injectable(), DailyService);
  decorate(inject(TYPES.DailySupabaseAdapterId), DailyService, 0);
};

export const bind = (container: Container) => {
  container.bind(TYPES.DailySupabaseAdapterId).to(DailySupabaseAdapter);
  container.bind(TYPES.DailyGetUseCaseId).to(DailyService);
  container.bind(TYPES.DailyFindAllUseCaseId).to(DailyService);
};
