import { About } from '@/app/about/domain/about';

export interface GetAboutUseCase {
  getAbout(): Promise<About>;
}
