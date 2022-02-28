import {AboutGetUseCase} from "../about/application/port/incoming/AboutGetUseCase";
import {AboutService} from "../about/application/AboutService";
import {AboutInMemoryAdapter} from "../about/adapter/outgoing/AboutInMemoryAdapter";
import {BlogGetUseCase} from "../blog/application/port/incoming/BlogGetUseCase";
import {BlogService} from "../blog/application/BlogService";
import {BlogPersistenceAdapter} from "../blog/adapter/outgoing/BlogPersistenceAdapter";
import {BlogFindAllUseCase} from "../blog/application/port/incoming/BlogFindAllUseCase";
import {BlogGetPrevOrNextUseCase} from "../blog/application/port/incoming/BlogGetPrevOrNextUseCase";
import {DailyService} from "../daily/application/port/DailyService";
import {DailyPersistenceAdapter} from "../daily/adapter/outgoing/DailyPersistenceAdapter";
import {DailyGetUseCase} from "../daily/application/port/incoming/DailyGetUseCase";
import {DailyFindAllUseCase} from "../daily/application/port/incoming/DailyFindAllUseCase";
import {MusingService} from "../musing/application/MusingService";
import {MusingPersistenceAdapter} from "../musing/adapter/outgoing/MusingPersistenceAdapter";
import {MusingFindAllUseCase} from "../musing/application/port/incoming/MusingFindAllUseCase";

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
  readonly aboutGetUseCase: AboutGetUseCase = this.aboutService;
  readonly blogGetUseCase: BlogGetUseCase = this.blogService;
  readonly blogFindAllUseCase: BlogFindAllUseCase = this.blogService;
  readonly blogGetPrevOrNextUseCase: BlogGetPrevOrNextUseCase = this.blogService;
  readonly dailyGetUseCase: DailyGetUseCase = this.dailyService;
  readonly dailyFindAllUseCase: DailyFindAllUseCase = this.dailyService;
  readonly musingFindAllUseCase: MusingFindAllUseCase = this.musingService;
}

export const applicationContext = new ApplicationContext();
