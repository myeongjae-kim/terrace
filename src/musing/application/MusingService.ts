import {MusingFindAllUseCase} from "./port/incoming/MusingFindAllUseCase";
import {StrapiResponse} from "../../common/domain/StrapiResponse";
import {MusingLoadPort} from "./port/outgoing/MusingLoadPort";
import {MusingResponseDto} from "../domain";

export class MusingService implements MusingFindAllUseCase {
  constructor(private readonly loadMusingPort: MusingLoadPort) {}

  public findAll = (): Promise<StrapiResponse<MusingResponseDto>> => {
    return this.loadMusingPort.findAll().then(it => ({
      ...it,
      data: it.data.map(datum => ({
        id: "" + datum.id,
        quote: datum.attributes.quote,
        from: datum.attributes.from,
        language: datum.attributes.language,
      }))
    }));
  };
}
