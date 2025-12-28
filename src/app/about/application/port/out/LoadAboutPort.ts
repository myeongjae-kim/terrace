import { About } from '@/app/about/domain/about';

export interface LoadAboutPort {
  getAbout(): Promise<About>;
}
