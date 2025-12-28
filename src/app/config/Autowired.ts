import { returnTypesafeAutowired } from 'inversify-spring-like';
import type { BeanNames } from './BeanConfig';

export const { Autowired } = returnTypesafeAutowired<keyof BeanNames>();
