import {GetAboutUseCase} from "../about/application/port/incoming/GetAboutUseCase";
import {AboutService} from "../about/application/AboutService";
import {AboutInMemoryAdapter} from "../about/adapter/outgoing/AboutInMemoryAdapter";
import {GetBlogUseCase} from "../blog/application/port/incoming/GetBlogUseCase";
import {BlogService} from "../blog/application/BlogService";
import {BlogPersistenceAdapter} from "../blog/adapter/outgoing/BlogPersistenceAdapter";
import {GetBlogListUseCase} from "../blog/application/port/incoming/GetBlogListUseCase";
import {GetBlogPrevOrNextUseCase} from "../blog/application/port/incoming/GetBlogPrevOrNextUseCase";

class DiContainer {
  // implementations
  private readonly aboutService: AboutService = new AboutService(new AboutInMemoryAdapter());
  private readonly blogService: BlogService = new BlogService(
    new BlogPersistenceAdapter(),
    new BlogPersistenceAdapter(),
  );

  // interfaces
  readonly getAboutUseCase: GetAboutUseCase = this.aboutService;
  readonly getBlogUseCase: GetBlogUseCase = this.blogService;
  readonly getBlogListUseCase: GetBlogListUseCase = this.blogService;
  readonly getBlogPrevOrNextUseCase: GetBlogPrevOrNextUseCase = this.blogService;
}

export const diContainer = new DiContainer();
