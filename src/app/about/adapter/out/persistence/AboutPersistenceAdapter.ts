import { about } from '@/app/about/domain/about';
import { Component } from '@/app/config/Component';
import { LoadAboutPort } from '../../../application/port/out/LoadAboutPort';

@Component()
export class AboutPersistenceAdapter implements LoadAboutPort {
  getAbout() {
    return Promise.resolve(about);
  }
}
