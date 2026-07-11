import type { Place } from "#/core/place/domain";
import { VStack } from "@astryxdesign/core/VStack";
import { useEffect, useRef } from "react";

const DEFAULT_CENTER = {
	latitude: 37.5665,
	longitude: 126.978,
};
const CARTO_POSITRON_STYLE =
	"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export function AdminPlacesMap({
	places,
	onSelectCoordinates,
	onSelectPlace,
}: {
	places: readonly Place[];
	onSelectCoordinates: (coordinates: {
		latitude: number;
		longitude: number;
	}) => void;
	onSelectPlace: (place: Place) => void;
}) {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let isMounted = true;
		let cleanup: (() => void) | undefined;

		async function initializeMap() {
			const maplibregl = await import("maplibre-gl");
			if (!isMounted || !mapContainerRef.current) return;

			const map = new maplibregl.Map({
				container: mapContainerRef.current,
				center: [DEFAULT_CENTER.longitude, DEFAULT_CENTER.latitude],
				zoom: 4,
				attributionControl: false,
				style: CARTO_POSITRON_STYLE,
			});
			map.addControl(new maplibregl.AttributionControl({ compact: true }));
			let selectedMarker: InstanceType<typeof maplibregl.Marker> | null = null;
			map.on("click", (event) => {
				const coordinates: [number, number] = [
					event.lngLat.lng,
					event.lngLat.lat,
				];
				if (!selectedMarker) {
					const selectedMarkerElement = document.createElement("div");
					selectedMarkerElement.className =
						"size-4 rounded-full border-2 border-white bg-blue-500 shadow-md";
					selectedMarker = new maplibregl.Marker({
						element: selectedMarkerElement,
					})
						.setLngLat(coordinates)
						.addTo(map);
				} else {
					selectedMarker.setLngLat(coordinates);
				}

				map.easeTo({
					center: coordinates,
					zoom: map.getZoom(),
					duration: 600,
				});
				onSelectCoordinates({
					latitude: event.lngLat.lat,
					longitude: event.lngLat.lng,
				});
			});

			for (const place of places) {
				const markerElement = document.createElement("button");
				markerElement.type = "button";
				markerElement.className =
					"size-4 cursor-pointer rounded-full border-2 border-white bg-accent-bg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-accent-bg";
				markerElement.setAttribute("aria-label", "Delete selected place");
				markerElement.addEventListener("click", (event) => {
					event.stopPropagation();
					onSelectPlace(place);
				});
				new maplibregl.Marker({ element: markerElement })
					.setLngLat([place.longitude, place.latitude])
					.addTo(map);
			}

			cleanup = () => map.remove();
		}

		void initializeMap();
		return () => {
			isMounted = false;
			cleanup?.();
		};
	}, [onSelectCoordinates, onSelectPlace, places]);

	return (
		<VStack
			ref={mapContainerRef}
			aria-label="Places management map"
			width="100%"
			height="34rem"
			className="overflow-hidden rounded-lg shadow-md"
		/>
	);
}
