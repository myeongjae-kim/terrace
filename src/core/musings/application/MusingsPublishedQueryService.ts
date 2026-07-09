import { Autowired } from "#/core/config/Autowired";
import type { ListPublishedMusingsUseCase } from "./port/in/ListPublishedMusingsUseCase";
import type { MusingsQueryPort } from "./port/out/MusingsQueryPort";

export class MusingsPublishedQueryService implements ListPublishedMusingsUseCase {
  constructor(
    @Autowired("MusingsQueryPort")
    private readonly musingsQueryPort: MusingsQueryPort,
  ) {}

  list(input?: Parameters<ListPublishedMusingsUseCase["list"]>[0]) {
    return this.musingsQueryPort.listPublished(input);
  }
}
