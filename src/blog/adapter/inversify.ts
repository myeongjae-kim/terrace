import {Container, decorate, inject, injectable} from "inversify";
import * as remoteCallModule from "../../infrastructure/remote-call/inversify";
import {BlogService} from "../application/BlogService";
import { BlogPersistenceAdapter } from "./outgoing/BlogPersistenceAdapter";

const TYPES = {
  BlogPersistenceAdapterId: Symbol.for("BlogPersistenceAdapter"),
  BlogGetUseCaseId: Symbol.for("BlogGetUseCase"),
  BlogFindAllUseCaseId: Symbol.for("BlogFindAllUseCase"),
  BlogGetPrevOrNextUseCaseId: Symbol.for("BlogGetPrevOrNextUseCase"),
};

export const { BlogGetUseCaseId, BlogPersistenceAdapterId, BlogFindAllUseCaseId, BlogGetPrevOrNextUseCaseId } = TYPES;

export const decorateClasses = () => {
  decorate(injectable(), BlogService);
  decorate(inject(BlogPersistenceAdapterId), BlogService, 0);
  decorate(inject(BlogPersistenceAdapterId), BlogService, 1);

  decorate(injectable(), BlogPersistenceAdapter);
  decorate(inject(remoteCallModule.SupabaseId), BlogPersistenceAdapter, 0);
};

export const bind = (container: Container) => {
  container.bind(BlogGetUseCaseId).to(BlogService);
  container.bind(BlogGetPrevOrNextUseCaseId).to(BlogService);
  container.bind(BlogFindAllUseCaseId).to(BlogService);
  container.bind(BlogPersistenceAdapterId).to(BlogPersistenceAdapter);
};
