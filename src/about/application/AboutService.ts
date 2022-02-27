import {GetAboutUseCase} from "./port/incoming/GetAboutUseCase";
import {LoadAboutPort} from "./port/outgoing/LoadAboutPort";
import {About} from "../domain/About";

export class AboutService implements GetAboutUseCase {

  private readonly loadAboutPort: LoadAboutPort;

  constructor(loadAboutPort: LoadAboutPort) {
    this.loadAboutPort = loadAboutPort;
  }

  public get = (): Promise<About> => this.loadAboutPort.get();
}
