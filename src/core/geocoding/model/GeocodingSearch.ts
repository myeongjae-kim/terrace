export type GeocodingSearchResult = {
	readonly id: string;
	readonly label: string;
	readonly latitude: number;
	readonly longitude: number;
};

export type GeocodingSearchResponse = {
	readonly results: readonly GeocodingSearchResult[];
};
