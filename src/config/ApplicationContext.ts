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
import Axios, {AxiosInstance} from "axios";
import ReactGA from "react-ga";

// configurations
ReactGA.initialize("UA-126240406-1");

// context
class ApplicationContext {
  // dependencies
  private readonly publicToken = "5f5da4885cc60c4007a770e20bcb499584306df76f7024786943770d87d10ec647588ed508a328726c03144cecb04e65377865e992cf557c9398f280355f1b5d66816bd18b466c4c973d90a93c5a04b3635a518688b2e49c468eca9c92bf0098dc6851481cd51bc9d60b33c4b7c65e81885b6dd53990b7e0397451b59cd000e6";
  private readonly axiosInstance: AxiosInstance = Axios.create({
    headers: {
      "Authorization": "Bearer " + this.publicToken
    }
  });

  // implementations
  private readonly aboutService: AboutService = new AboutService(new AboutInMemoryAdapter());
  private readonly blogService: BlogService = new BlogService(
    new BlogPersistenceAdapter(),
    new BlogPersistenceAdapter(),
  );
  private readonly dailyService: DailyService = new DailyService(new DailyPersistenceAdapter(this.axiosInstance));
  private readonly musingService: MusingService = new MusingService(new MusingPersistenceAdapter(this.axiosInstance));

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
