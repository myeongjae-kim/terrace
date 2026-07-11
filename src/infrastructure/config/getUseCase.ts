import type { UseCaseBeans } from "#/core/config/DependencyTokens";
import { applicationContext } from "./applicationContext.server";

export function getUseCase<TName extends keyof UseCaseBeans>(
	name: TName,
): UseCaseBeans[TName] {
	return applicationContext().get(name);
}
