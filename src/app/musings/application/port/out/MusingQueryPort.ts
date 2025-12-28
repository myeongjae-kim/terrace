import { Musing } from '@/app/musings/domain/Musing';

export interface MusingQueryPort {
  findAll: () => Promise<Musing[]>;
}
