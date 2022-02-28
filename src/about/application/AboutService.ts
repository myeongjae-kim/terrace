import {AboutGetUseCase} from "./port/incoming/AboutGetUseCase";
import {AboutLoadPort} from "./port/outgoing/AboutLoadPort";
import {About} from "../domain/About";

export class AboutService implements AboutGetUseCase {

  constructor(private readonly loadAboutPort: AboutLoadPort) {}

  public get = (): Promise<About> => this.loadAboutPort.get();
}
