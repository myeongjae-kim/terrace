import "reflect-metadata";
import { ApplicationContext } from "inversify-typesafe-spring-like";
import { beanConfig } from "./BeanConfig.server";

const lazy = <T>(fn: () => T) => {
	let value: T | undefined;
	return () => {
		value ??= fn();
		return value;
	};
};

export const applicationContext = lazy(() => ApplicationContext(beanConfig));
