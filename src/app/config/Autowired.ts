import { inject } from 'inversify';
import type { BeanNames } from './BeanConfig';

export const Autowired = (serviceIdentifier: keyof BeanNames) => inject(serviceIdentifier);
