import { applicationContext } from "#/core/config/applicationContext";
import { createServerFn } from "@tanstack/react-start";

export const listMusings = createServerFn({ method: "GET" }).handler(async () => {
	return await applicationContext()
		.get("ListPublishedMusingsUseCase")
		.list({ limit: 100, offset: 0 });
});
