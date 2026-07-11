import { returnAutowired } from "inversify-typesafe-spring-like";
import type { Beans } from "./DependencyTokens";

export const { Autowired } = returnAutowired<Beans>();
