import { about } from '@/app/about/domain/about';
import { LoadAboutPort } from '../../../application/port/out/LoadAboutPort';

export class AboutPersistenceAdapter implements LoadAboutPort {
  getAbout() {
    return Promise.resolve(about);
  }
}
