import { Autowired } from "#/core/config/Autowired";
import type { CreateMusingUseCase } from "./port/in/CreateMusingUseCase";
import type { DeleteMusingUseCase } from "./port/in/DeleteMusingUseCase";
import type { GetMusingUseCase } from "./port/in/GetMusingUseCase";
import type { ListMusingsUseCase } from "./port/in/ListMusingsUseCase";
import type { UpdateMusingUseCase } from "./port/in/UpdateMusingUseCase";
import type { MusingsCommandPort } from "./port/out/MusingsCommandPort";
import type { MusingsQueryPort } from "./port/out/MusingsQueryPort";

export class MusingsCrudService
  implements
    CreateMusingUseCase,
    GetMusingUseCase,
    ListMusingsUseCase,
    UpdateMusingUseCase,
    DeleteMusingUseCase
{
  constructor(
    @Autowired("MusingsCommandPort")
    private readonly musingsCommandPort: MusingsCommandPort,
    @Autowired("MusingsQueryPort")
    private readonly musingsQueryPort: MusingsQueryPort,
  ) {}

  create(input: Parameters<CreateMusingUseCase["create"]>[0]) {
    return this.musingsCommandPort.create(input);
  }

  get(input: Parameters<GetMusingUseCase["get"]>[0]) {
    return this.musingsQueryPort.get(input);
  }

  list(input?: Parameters<ListMusingsUseCase["list"]>[0]) {
    return this.musingsQueryPort.list(input);
  }

  update(input: Parameters<UpdateMusingUseCase["update"]>[0]) {
    return this.musingsCommandPort.update(input);
  }

  delete(input: Parameters<DeleteMusingUseCase["delete"]>[0]) {
    return this.musingsCommandPort.delete(input);
  }
}
