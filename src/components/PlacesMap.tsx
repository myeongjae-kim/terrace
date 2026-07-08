import { VStack } from "@astryxdesign/core/VStack";
import { useEffect, useRef } from "react";

const SEOUL_CENTER = {
	latitude: 37.5665,
	longitude: 126.978,
};

const CARTO_POSITRON_STYLE =
	"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function PlacesMap() {
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
				center: [SEOUL_CENTER.longitude, SEOUL_CENTER.latitude],
				zoom: 2,
				attributionControl: false,
				style: CARTO_POSITRON_STYLE,
			});

			map.addControl(new maplibregl.AttributionControl({ compact: true }));

			const markerElement = document.createElement("div");
			markerElement.className =
				"size-4 rounded-full border-2 border-white bg-blue-500 shadow-md";

			new maplibregl.Marker({
				element: markerElement,
			})
				.setLngLat([SEOUL_CENTER.longitude, SEOUL_CENTER.latitude])
				.addTo(map);

			cleanup = () => {
				map.remove();
			};
		}

		void initializeMap();

		return () => {
			isMounted = false;
			cleanup?.();
		};
	}, []);

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
