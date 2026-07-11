import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { PlaceId } from "#/core/place/domain";
import { createOwnerServerFn } from "#/features/owner-auth/serverFns";
import { getUseCase } from "#/infrastructure/config/getUseCase";

const coordinatesSchema = z.object({
	latitude: z.number().finite().min(-90).max(90),
	longitude: z.number().finite().min(-180).max(180),
});

export const listPlaces = createServerFn({ method: "GET" }).handler(
	async () => await getUseCase("ListPlacesUseCase").list(),
);

export const createPlace = createOwnerServerFn({ method: "POST" })
	.validator(coordinatesSchema)
	.handler(
		async ({ data }) => await getUseCase("CreatePlaceUseCase").create(data),
	);

export const deletePlace = createOwnerServerFn({ method: "POST" })
	.validator(z.object({ id: z.string().min(1) }))
	.handler(async ({ data }) => {
		const deleted = await getUseCase("DeletePlaceUseCase").delete({
			id: data.id as PlaceId,
		});
		if (!deleted) throw new Error("장소를 찾을 수 없습니다.");
		return { deleted: true };
	});
