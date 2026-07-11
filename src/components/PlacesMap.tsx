import type { Place } from "#/core/place/domain";
import { VStack } from "@astryxdesign/core/VStack";
import { useEffect, useRef } from "react";

const DEFAULT_CENTER = {
	latitude: 37.5665,
	longitude: 126.978,
};

const CARTO_POSITRON_STYLE =
	"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function PlacesMap({ places }: { places: readonly Place[] }) {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let isMounted = true;
		let cleanup: (() => void) | undefined;

		async function initializeMap() {
			const maplibregl = await import("maplibre-gl");

			if (!isMounted || mapContainerRef.current == null) {
				return;
			}

			const map = new maplibregl.Map({
				container: mapContainerRef.current,
				center: [DEFAULT_CENTER.longitude, DEFAULT_CENTER.latitude],
				zoom: 2,
				attributionControl: false,
				style: CARTO_POSITRON_STYLE,
			});

			map.addControl(new maplibregl.AttributionControl({ compact: true }));

			for (const place of places) {
				const markerElement = document.createElement("div");
				markerElement.className =
					"size-3 rounded-full border-2 border-white bg-accent-bg shadow-md";
				markerElement.setAttribute("aria-label", "Visited place");
				new maplibregl.Marker({ element: markerElement })
					.setLngLat([place.longitude, place.latitude])
					.addTo(map);
			}

			cleanup = () => {
				map.remove();
			};
		}

		void initializeMap();

		return () => {
			isMounted = false;
			cleanup?.();
		};
	}, [places]);

	return (
		<VStack
			ref={mapContainerRef}
			aria-label="Places map centered on Seoul"
			width="100%"
			maxWidth="64rem"
			height="32rem"
			className="mb-10 mt-5 overflow-hidden rounded-lg shadow-xl"
		/>
	);
}
