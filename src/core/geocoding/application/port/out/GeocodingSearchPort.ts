import type { GeocodingSearchResponse } from "#/core/geocoding/model/GeocodingSearch";

export interface GeocodingSearchPort {
	search(input: { query: string }): Promise<GeocodingSearchResponse>;
}
