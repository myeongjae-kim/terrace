import {GetAboutUseCase} from "../about/application/port/incoming/GetAboutUseCase";
import {AboutService} from "../about/application/AboutService";
import {AboutInMemoryAdapter} from "../about/adapter/outgoing/AboutInMemoryAdapter";
import {GetBlogUseCase} from "../blog/application/port/incoming/GetBlogUseCase";
import {BlogService} from "../blog/application/BlogService";
import {BlogPersistenceAdapter} from "../blog/adapter/outgoing/BlogPersistenceAdapter";
import {GetBlogListUseCase} from "../blog/application/port/incoming/GetBlogListUseCase";
import {GetBlogPrevOrNextUseCase} from "../blog/application/port/incoming/GetBlogPrevOrNextUseCase";
import {DailyService} from "../daily/application/port/DailyService";
import {DailyPersistenceAdapter} from "../daily/adapter/outgoing/DailyPersistenceAdapter";
import {GetDailyUseCase} from "../daily/application/port/incoming/GetDailyUseCase";
import {GetDailyListUseCase} from "../daily/application/port/incoming/GetDailyListUseCase";
import {MusingService} from "../musing/application/MusingService";
import {MusingPersistenceAdapter} from "../musing/adapter/outgoing/MusingPersistenceAdapter";
import {GetMusingListUseCase} from "../musing/application/port/incoming/GetMusingListUseCase";

class ApplicationContext {
  // implementations
  private readonly aboutService: AboutService = new AboutService(new AboutInMemoryAdapter());
  private readonly blogService: BlogService = new BlogService(
    new BlogPersistenceAdapter(),
    new BlogPersistenceAdapter(),
  );
  private readonly dailyService: DailyService = new DailyService(new DailyPersistenceAdapter());
  private readonly musingService: MusingService = new MusingService(new MusingPersistenceAdapter());

  // interfaces
  readonly getAboutUseCase: GetAboutUseCase = this.aboutService;
  readonly getBlogUseCase: GetBlogUseCase = this.blogService;
  readonly getBlogListUseCase: GetBlogListUseCase = this.blogService;
  readonly getBlogPrevOrNextUseCase: GetBlogPrevOrNextUseCase = this.blogService;
  readonly getDailyUseCase: GetDailyUseCase = this.dailyService;
  readonly getDailyListUseCase: GetDailyListUseCase = this.dailyService;
  readonly getMusingListUseCase: GetMusingListUseCase = this.musingService;
}

export const applicationContext = new ApplicationContext();
