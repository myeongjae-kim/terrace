import type { Place } from "#/core/place/domain";

export interface PlaceQueryPort {
	listActive(): Promise<readonly Place[]>;
	findActiveByCoordinates(input: {
		latitude: number;
		longitude: number;
	}): Promise<Place | null>;
}
