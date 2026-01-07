import { ApplicationContext } from 'inversify-typesafe-spring-like';
import { Beans, createBeanConfig } from './BeanConfig';

let _applicationContextAsync: ReturnType<typeof ApplicationContext<Beans>>;
export const applicationContextAsync = async () => {
  if (_applicationContextAsync) {
    return _applicationContextAsync;
  }

  _applicationContextAsync = ApplicationContext(await createBeanConfig());

  return _applicationContextAsync;
};
