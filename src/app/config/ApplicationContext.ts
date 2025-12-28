import { ApplicationContext } from 'inversify-spring-like';
import { beanConfig } from './BeanConfig';

let _applicationContext: ApplicationContext<typeof beanConfig>;

// thunk for lazy and singleton for serverless
export const applicationContext = () => {
  if (_applicationContext) {
    return _applicationContext;
  }

  _applicationContext = new ApplicationContext(beanConfig);

  return _applicationContext;
};
