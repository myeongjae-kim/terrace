import { describe, expect, it } from "vitest";
import { parsePlaceGeoJson } from "./placeGeoJson";

describe("parsePlaceGeoJson", () => {
	it("maps GeoJSON longitude-latitude points to places", () => {
		expect(
			parsePlaceGeoJson({
				features: [
					{ geometry: { type: "Point", coordinates: [126.978, 37.5665] } },
				],
			}),
		).toEqual([{ latitude: 37.5665, longitude: 126.978 }]);
	});

	it("rejects non-point features", () => {
		expect(() =>
			parsePlaceGeoJson({
				features: [{ geometry: { type: "LineString", coordinates: [] } }],
			}),
		).toThrow("Point");
	});
});
