import { z } from "zod";
import { createOwnerServerFn } from "#/features/owner-auth/serverFns";
import { getUseCase } from "#/infrastructure/config/getUseCase";

export const searchAddresses = createOwnerServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().trim().min(2).max(200) }))
	.handler(
		async ({ data }) =>
			await getUseCase("SearchGeocodingUseCase").search({
				query: data.query,
			}),
	);
