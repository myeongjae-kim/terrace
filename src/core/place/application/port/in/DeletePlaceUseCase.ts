import type { PlaceId } from "#/core/place/domain";

export interface DeletePlaceUseCase {
	delete(input: { id: PlaceId }): Promise<boolean>;
}
