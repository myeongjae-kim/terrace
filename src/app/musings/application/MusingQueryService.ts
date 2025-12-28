import { Autowired } from '@/app/config/Autowired';
import { Component } from '@/app/config/Component';
import { FindAllMusingsUseCase } from './port/in/FindAllMusingsUseCase';
import type { MusingQueryPort } from './port/out/MusingQueryPort';

@Component()
export class MusingQueryService implements FindAllMusingsUseCase {
  constructor(
    @Autowired('MusingQueryPort')
    private readonly musingQueryPort: MusingQueryPort,
  ) {}

  async findAll() {
    return this.musingQueryPort.findAll();
  }
}
