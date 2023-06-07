import {Container, decorate, inject, injectable} from "inversify";
import * as remoteCallModule from "../../infrastructure/remote-call/inversify";
import {BlogService} from "../application/BlogService";
import { BlogSupabaseAdapter } from "./outgoing/BlogSupabaseAdapter";

const TYPES = {
  BlogSupabaseAdapterId: Symbol.for("BlogSupabaseAdapter"),
  BlogGetUseCaseId: Symbol.for("BlogGetUseCase"),
  BlogFindAllUseCaseId: Symbol.for("BlogFindAllUseCase"),
  BlogGetPrevOrNextUseCaseId: Symbol.for("BlogGetPrevOrNextUseCase"),
};

export const { BlogGetUseCaseId, BlogSupabaseAdapterId, BlogFindAllUseCaseId, BlogGetPrevOrNextUseCaseId } = TYPES;

export const decorateClasses = () => {
  decorate(injectable(), BlogService);
  decorate(inject(BlogSupabaseAdapterId), BlogService, 0);
  decorate(inject(BlogSupabaseAdapterId), BlogService, 1);

  decorate(injectable(), BlogSupabaseAdapter);
  decorate(inject(remoteCallModule.SupabaseId), BlogSupabaseAdapter, 0);
};

export const bind = (container: Container) => {
  container.bind(BlogGetUseCaseId).to(BlogService);
  container.bind(BlogGetPrevOrNextUseCaseId).to(BlogService);
  container.bind(BlogFindAllUseCaseId).to(BlogService);
  container.bind(BlogSupabaseAdapterId).to(BlogSupabaseAdapter);
};
