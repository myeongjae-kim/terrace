import type { CreatePlaceInput, Place } from "#/core/place/domain";

export interface CreatePlaceUseCase {
	create(input: CreatePlaceInput): Promise<Place>;
}
