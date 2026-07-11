import type { Brand, IsoDateTimeString } from "#/core/common/domain";

export type PlaceId = Brand<string, "PlaceId">;

export type Place = {
	readonly id: PlaceId;
	readonly latitude: number;
	readonly longitude: number;
	readonly createdAt: IsoDateTimeString | null;
	readonly updatedAt: IsoDateTimeString | null;
};

export type CreatePlaceInput = {
	readonly latitude: number;
	readonly longitude: number;
};
