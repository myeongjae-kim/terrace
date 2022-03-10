import {Container} from "inversify";
import "reflect-metadata";
import * as axiosModule from "src/infrastructure/remote-call/inversify";
import * as aboutModule from "src/about/adapter/inversify";
import * as blogModule from "src/blog/adapter/inversify";
import * as dailyModule from "src/daily/adapter/inversify";
import * as musingModule from "src/musing/adapter/inversify";

configure(() => {
  aboutModule.decorateClasses();
  blogModule.decorateClasses();
  dailyModule.decorateClasses();
  musingModule.decorateClasses();
});

export const container: Container = (() => {
  const c = new Container();
  [
    axiosModule.bind,
    aboutModule.bind,
    blogModule.bind,
    dailyModule.bind,
    musingModule.bind,
  ].forEach(bind => bind(c));

  return c;
})();

function configure(runnable: () => void) {
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
