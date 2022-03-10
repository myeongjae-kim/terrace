import {AboutService} from "../about/application/AboutService";
import {AboutInMemoryAdapter} from "../about/adapter/outgoing/AboutInMemoryAdapter";
import {BlogPersistenceAdapter} from "../blog/adapter/outgoing/BlogPersistenceAdapter";
import Axios from "axios";
import {Container, decorate, inject, injectable} from "inversify";
import "reflect-metadata";
import {myAxiosRequestConfig} from "./myAxiosRequestConfig";
import {BlogService} from "../blog/application/BlogService";
import {DailyPersistenceAdapter} from "../daily/adapter/outgoing/DailyPersistenceAdapter";
import {DailyService} from "../daily/application/port/DailyService";
import {MusingPersistenceAdapter} from "../musing/adapter/outgoing/MusingPersistenceAdapter";
import {MusingService} from "../musing/application/MusingService";

// TODO: 도메인별로 inversify 설정을 분리
const BEANS = {
  Axios: Symbol.for("Axios"),
  AboutInMemoryAdapter: Symbol.for("AboutInMemoryAdapter"),
  BlogPersistenceAdapter: Symbol.for("BlogPersistenceAdapter"),
  DailyPersistenceAdapter: Symbol.for("DailyPersistenceAdapter"),
  MusingPersistenceAdapter: Symbol.for("MusingPersistenceAdapter"),
};

export const USE_CASES = {
  AboutGetUseCase: Symbol.for("AboutGetUseCase"),
  BlogGetUseCase: Symbol.for("BlogGetUseCase"),
  BlogFindAllUseCase: Symbol.for("BlogFindAllUseCase"),
  BlogGetPrevOrNextUseCase: Symbol.for("BlogGetPrevOrNextUseCase"),
  DailyGetUseCase: Symbol.for("DailyGetUseCase"),
  DailyFindAllUseCase: Symbol.for("DailyFindAllUseCase"),
  MusingFindAllUseCase: Symbol.for("MusingFindAllUseCase"),
};

// Declare as injectable and its dependencies
configure(() => {
  // about
  decorate(injectable(), AboutInMemoryAdapter);
  decorate(injectable(), AboutService);
  decorate(inject(BEANS.AboutInMemoryAdapter), AboutService, 0);

  // blog
  decorate(injectable(), BlogPersistenceAdapter);
  decorate(inject(BEANS.Axios), BlogPersistenceAdapter, 0);

  decorate(injectable(), BlogService);
  decorate(inject(BEANS.BlogPersistenceAdapter), BlogService, 0);
  decorate(inject(BEANS.BlogPersistenceAdapter), BlogService, 1);

  // daily
  decorate(injectable(), DailyPersistenceAdapter);
  decorate(inject(BEANS.Axios), DailyPersistenceAdapter, 0);

  decorate(injectable(), DailyService);
  decorate(inject(BEANS.DailyPersistenceAdapter), DailyService, 0);

  // musings
  decorate(injectable(), MusingPersistenceAdapter);
  decorate(inject(BEANS.Axios), MusingPersistenceAdapter, 0);

  decorate(injectable(), MusingService);
  decorate(inject(BEANS.MusingPersistenceAdapter), MusingService, 0);
});

// Declare bindings
export const container: Container = new Container();
container.bind(BEANS.Axios).toConstantValue(Axios.create(myAxiosRequestConfig));
container.bind(BEANS.AboutInMemoryAdapter).to(AboutInMemoryAdapter);
container.bind(BEANS.BlogPersistenceAdapter).to(BlogPersistenceAdapter);
container.bind(BEANS.DailyPersistenceAdapter).to(DailyPersistenceAdapter);
container.bind(BEANS.MusingPersistenceAdapter).to(MusingPersistenceAdapter);

container.bind(USE_CASES.AboutGetUseCase).to(AboutService);
container.bind(USE_CASES.BlogGetUseCase).to(BlogService);
container.bind(USE_CASES.BlogGetPrevOrNextUseCase).to(BlogService);
container.bind(USE_CASES.BlogFindAllUseCase).to(BlogService);
container.bind(USE_CASES.DailyGetUseCase).to(DailyService);
container.bind(USE_CASES.DailyFindAllUseCase).to(DailyService);
container.bind(USE_CASES.MusingFindAllUseCase).to(MusingService);

function configure(runnable:() => void) {
  try {
    runnable();
  } catch (e) {
    // decorate가 여러번 되는 경우가 있다.. 원인을 찾지 못했으나 SSR 관련일 것으로 추정.
    // 서버에서 이미 decorate한 스크립트가 브라우저로 넘어오는데 그 때 초기화(hydrate)하면서 다시 decorate를 하기 때문인 것 같다.
    // decorator관련 중복 에러인 경우는 무시하도록 처리함.
    if ((e as Error).message.includes("decorator multiple times")) {
      return;
    }

    throw e;
  }
}
