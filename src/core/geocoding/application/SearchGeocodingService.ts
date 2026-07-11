import { Autowired } from "#/core/config/Autowired";
import type { GeocodingSearchResponse } from "#/core/geocoding/model/GeocodingSearch";
import type { SearchGeocodingUseCase } from "./port/in/SearchGeocodingUseCase";
import type { GeocodingSearchPort } from "./port/out/GeocodingSearchPort";

const cacheTtlMs = 10 * 60 * 1000;
const maxCacheSize = 100;

type CachedSearch = {
	expiresAt: number;
	value: GeocodingSearchResponse;
};

export class SearchGeocodingService implements SearchGeocodingUseCase {
	private readonly cache = new Map<string, CachedSearch>();

	constructor(
		@Autowired("GeocodingSearchPort")
		private readonly geocodingSearchPort: GeocodingSearchPort,
	) {}

	async search({ query }: { query: string }) {
		const normalizedQuery = query.trim();
		const cacheKey = normalizedQuery.toLocaleLowerCase();
		const cached = this.cache.get(cacheKey);

		if (cached?.expiresAt && cached.expiresAt > Date.now()) {
			return cached.value;
		}

		const value = await this.geocodingSearchPort.search({
			query: normalizedQuery,
		});

		if (this.cache.size >= maxCacheSize) {
			const oldestKey = this.cache.keys().next().value;
			if (oldestKey) this.cache.delete(oldestKey);
		}

		this.cache.set(cacheKey, { expiresAt: Date.now() + cacheTtlMs, value });
		return value;
	}
}
