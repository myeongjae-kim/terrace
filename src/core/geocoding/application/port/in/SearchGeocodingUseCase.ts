import type { GeocodingSearchResponse } from "#/core/geocoding/model/GeocodingSearch";

export interface SearchGeocodingUseCase {
	search(input: { query: string }): Promise<GeocodingSearchResponse>;
}
