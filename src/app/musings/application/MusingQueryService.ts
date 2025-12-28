import { Autowired } from '@/app/config/Autowired';
import { FindAllMusingsUseCase } from './port/in/FindAllMusingsUseCase';
import type { MusingQueryPort } from './port/out/MusingQueryPort';

export class MusingQueryService implements FindAllMusingsUseCase {
  constructor(
    @Autowired('MusingQueryPort')
    private readonly musingQueryPort: MusingQueryPort,
  ) {}

  async findAll() {
    return this.musingQueryPort.findAll();
  }
}
