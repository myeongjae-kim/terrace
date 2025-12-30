import { ApplicationContext } from 'inversify-typesafe-spring-like';
import { beanConfig, Beans } from './BeanConfig';

let _applicationContext: ReturnType<typeof ApplicationContext<Beans>>;

// thunk for lazy and singleton for serverless
export const applicationContext = () => {
  if (_applicationContext) {
    return _applicationContext;
  }

  _applicationContext = ApplicationContext(beanConfig);

  return _applicationContext;
};
