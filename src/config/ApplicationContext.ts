import {AboutGetUseCase} from "../about/application/port/incoming/AboutGetUseCase";
import {BlogGetUseCase} from "../blog/application/port/incoming/BlogGetUseCase";
import {BlogFindAllUseCase} from "../blog/application/port/incoming/BlogFindAllUseCase";
import {BlogGetPrevOrNextUseCase} from "../blog/application/port/incoming/BlogGetPrevOrNextUseCase";
import {DailyGetUseCase} from "../daily/application/port/incoming/DailyGetUseCase";
import {DailyFindAllUseCase} from "../daily/application/port/incoming/DailyFindAllUseCase";
import {MusingFindAllUseCase} from "../musing/application/port/incoming/MusingFindAllUseCase";
import {container, USE_CASES} from "./inversify";

// context
class ApplicationContext {
  // use cases
  readonly aboutGetUseCase = container.get<AboutGetUseCase>(USE_CASES.AboutGetUseCase);
  readonly blogGetUseCase = container.get<BlogGetUseCase>(USE_CASES.BlogGetUseCase);
  readonly blogFindAllUseCase = container.get<BlogFindAllUseCase>(USE_CASES.BlogFindAllUseCase);
  readonly blogGetPrevOrNextUseCase = container.get<BlogGetPrevOrNextUseCase>(USE_CASES.BlogGetPrevOrNextUseCase);
  readonly dailyGetUseCase = container.get<DailyGetUseCase>(USE_CASES.DailyGetUseCase);
  readonly dailyFindAllUseCase = container.get<DailyFindAllUseCase>(USE_CASES.DailyFindAllUseCase);
  readonly musingFindAllUseCase = container.get<MusingFindAllUseCase>(USE_CASES.MusingFindAllUseCase);
}

export const applicationContext = new ApplicationContext();
