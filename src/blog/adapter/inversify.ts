import {Container, decorate, inject, injectable} from "inversify";
import {BlogPersistenceAdapter} from "./outgoing/BlogPersistenceAdapter";
import * as remoteCallModule from "../../infrastructure/remote-call/inversify";
import {BlogService} from "../application/BlogService";
import { BlogSupabaseAdapter } from "./outgoing/BlogSupabaseAdapter";

const TYPES = {
  BlogPersistenceAdapterId: Symbol.for("BlogPersistenceAdapter"),
  BlogSupabaseAdapterId: Symbol.for("BlogSupabaseAdapter"),
  BlogGetUseCaseId: Symbol.for("BlogGetUseCase"),
  BlogFindAllUseCaseId: Symbol.for("BlogFindAllUseCase"),
  BlogGetPrevOrNextUseCaseId: Symbol.for("BlogGetPrevOrNextUseCase"),
};

export const { BlogGetUseCaseId, BlogSupabaseAdapterId, BlogFindAllUseCaseId, BlogGetPrevOrNextUseCaseId } = TYPES;

export const decorateClasses = () => {
  decorate(injectable(), BlogPersistenceAdapter);
  decorate(inject(remoteCallModule.AxiosId), BlogPersistenceAdapter, 0);

  decorate(injectable(), BlogService);
  decorate(inject(TYPES.BlogPersistenceAdapterId), BlogService, 0);
  decorate(inject(TYPES.BlogSupabaseAdapterId), BlogService, 1);

  decorate(injectable(), BlogSupabaseAdapter);
  decorate(inject(remoteCallModule.SupabaseId), BlogSupabaseAdapter, 0);
};

export const bind = (container: Container) => {
  container.bind(TYPES.BlogPersistenceAdapterId).to(BlogPersistenceAdapter);
  container.bind(TYPES.BlogGetUseCaseId).to(BlogService);
  container.bind(TYPES.BlogGetPrevOrNextUseCaseId).to(BlogService);
  container.bind(TYPES.BlogFindAllUseCaseId).to(BlogService);
  container.bind(TYPES.BlogSupabaseAdapterId).to(BlogSupabaseAdapter);
};
