import type { CreatePlaceInput, Place, PlaceId } from "#/core/place/domain";

export interface PlaceCommandPort {
	create(input: CreatePlaceInput): Promise<Place>;
	softDelete(input: { id: PlaceId }): Promise<boolean>;
}
