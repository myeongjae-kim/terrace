import { MusingFindAllUseCase } from "./port/incoming/MusingFindAllUseCase";
import { MusingLoadPort } from "./port/outgoing/MusingLoadPort";
import { MusingResponseDto } from "../domain";

export class MusingService implements MusingFindAllUseCase {
  constructor(private readonly loadMusingPort: MusingLoadPort) {}

  public findAll = (): Promise<MusingResponseDto[]> => {
    return this.loadMusingPort.findAll()
      .then(it => it.map(datum => ({
        id: "" + datum.id,
        quote: datum.quote,
        from: datum.from,
        language: datum.language,
      })));
  };
}
