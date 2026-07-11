import { getUseCase } from "#/infrastructure/config/getUseCase";
import { createServerFn } from "@tanstack/react-start";

export const listMusings = createServerFn({ method: "GET" }).handler(
	async () => {
		return await getUseCase("ListPublishedMusingsUseCase").list({
			limit: 100,
			offset: 0,
		});
	},
);
