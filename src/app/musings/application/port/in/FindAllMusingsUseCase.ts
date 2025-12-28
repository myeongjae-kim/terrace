import { Musing } from '@/app/musings/domain/Musing';

export interface FindAllMusingsUseCase {
  findAll: () => Promise<Musing[]>;
}
