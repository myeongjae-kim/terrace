import { Autowired } from '@/app/config/Autowired';
import type { GetAboutUseCase } from './port/in/GetAboutUseCase';
import type { LoadAboutPort } from './port/out/LoadAboutPort';

export class AboutService implements GetAboutUseCase {
  constructor(
    @Autowired('LoadAboutPort')
    private readonly loadAboutPort: LoadAboutPort,
  ) {}

  getAbout() {
    return this.loadAboutPort.getAbout();
  }
}
