import type { Place } from "#/core/place/domain";

export interface ListPlacesUseCase {
	list(): Promise<readonly Place[]>;
}
