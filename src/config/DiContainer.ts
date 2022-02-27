import {GetAboutUseCase} from "../about/application/port/incoming/GetAboutUseCase";
import {AboutService} from "../about/application/AboutService";
import {AboutInMemoryAdapter} from "../about/adapter/outgoing/AboutInMemoryAdapter";

class DiContainer {
  readonly getAboutUseCase: GetAboutUseCase = new AboutService(new AboutInMemoryAdapter());
}

export const diContainer = new DiContainer();
