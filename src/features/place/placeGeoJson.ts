export type PlaceCoordinates = { latitude: number; longitude: number };

export function parsePlaceGeoJson(value: unknown): PlaceCoordinates[] {
	if (
		!value ||
		typeof value !== "object" ||
		!("features" in value) ||
		!Array.isArray(value.features)
	) {
		throw new Error("GeoJSON FeatureCollection이 아닙니다.");
	}

	return value.features.map((feature, index) => {
		if (
			!feature ||
			typeof feature !== "object" ||
			!("geometry" in feature) ||
			!feature.geometry ||
			typeof feature.geometry !== "object" ||
			!("type" in feature.geometry) ||
			feature.geometry.type !== "Point" ||
			!("coordinates" in feature.geometry) ||
			!Array.isArray(feature.geometry.coordinates)
		) {
			throw new Error(`Feature ${index + 1}은 Point가 아닙니다.`);
		}

		const [longitude, latitude] = feature.geometry.coordinates;
		if (
			typeof latitude !== "number" ||
			typeof longitude !== "number" ||
			!Number.isFinite(latitude) ||
			!Number.isFinite(longitude)
		) {
			throw new Error(`Feature ${index + 1}의 좌표가 올바르지 않습니다.`);
		}

		return { latitude, longitude };
	});
}
