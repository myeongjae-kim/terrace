import {GetMusingListUseCase} from "./port/incoming/GetMusingListUseCase";
import {StrapiResponse} from "../../common/domain/StrapiResponse";
import {LoadMusingPort} from "./port/outgoing/LoadMusingPort";
import {MusingResponseDto} from "../domain";

export class MusingService implements GetMusingListUseCase {
  constructor(private readonly loadMusingPort: LoadMusingPort) {}

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
