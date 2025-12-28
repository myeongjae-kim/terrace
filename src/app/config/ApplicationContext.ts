import { ApplicationContext } from 'inversify-spring-like';
import { beanConfig } from './BeanConfig';

export const applicationContext = new ApplicationContext(beanConfig);
