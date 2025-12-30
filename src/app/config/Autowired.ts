import { returnAutowired } from 'inversify-typesafe-spring-like';
import type { Beans } from './BeanConfig';

export const { Autowired } = returnAutowired<Beans>();
