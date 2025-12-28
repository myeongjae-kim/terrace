import { Container } from 'inversify';
import { beanConfig, type BeanNames } from './BeanConfig';
import { extractScope } from './extractScope';

export class ApplicationContext {
  private container: Container;

  constructor() {
    this.container = new Container({ autobind: true });
    Object.entries(beanConfig).forEach(([name, service]) => {
      if (!extractScope(service)) {
        throw new Error(
          `Bean ${name} does not have an explicit scope. Use @Component() decorator!`,
        );
      }

      return this.container.bind(name).to(service);
    });
  }

  public get<T extends keyof BeanNames>(serviceIdentifier: T): BeanNames[T] {
    return this.container.get(serviceIdentifier);
  }
}

export const applicationContext = new ApplicationContext();
