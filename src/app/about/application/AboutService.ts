import { GetAboutUseCase } from './port/in/GetAboutUseCase';
import { LoadAboutPort } from './port/out/LoadAboutPort';

export class AboutService implements GetAboutUseCase {
  constructor(private readonly loadAboutPort: LoadAboutPort) {}

  getAbout() {
    return this.loadAboutPort.getAbout();
  }
}
