import { Autowired } from "#/core/config/Autowired";
import type { MusingsCrudUseCase } from "./port/in/MusingsCrudUseCase";
import type { MusingsCommandPort } from "./port/out/MusingsCommandPort";
import type { MusingsQueryPort } from "./port/out/MusingsQueryPort";

export class MusingsCrudService implements MusingsCrudUseCase {
  constructor(
    @Autowired("MusingsCommandPort")
    private readonly musingsCommandPort: MusingsCommandPort,
    @Autowired("MusingsQueryPort")
    private readonly musingsQueryPort: MusingsQueryPort,
  ) {}

  create(input: Parameters<MusingsCrudUseCase["create"]>[0]) {
    return this.musingsCommandPort.create(input);
  }

  get(input: Parameters<MusingsCrudUseCase["get"]>[0]) {
    return this.musingsQueryPort.get(input);
  }

  list(input?: Parameters<MusingsCrudUseCase["list"]>[0]) {
    return this.musingsQueryPort.list(input);
  }

  update(input: Parameters<MusingsCrudUseCase["update"]>[0]) {
    return this.musingsCommandPort.update(input);
  }

  delete(input: Parameters<MusingsCrudUseCase["delete"]>[0]) {
    return this.musingsCommandPort.delete(input);
  }
}
