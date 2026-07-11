import { VStack } from "@astryxdesign/core/VStack";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import { useEffect, useRef } from "react";
import type { Place } from "#/core/place/domain";

const DEFAULT_CENTER = {
	latitude: 37.5665,
	longitude: 126.978,
};
const CARTO_POSITRON_STYLE =
	"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const SEA_LABEL_LAYER_IDS = ["watername_ocean", "watername_sea"];

export function AdminPlacesMap({
	places,
	selectedCoordinates,
	selectedZoom,
	onSelectCoordinates,
	onSelectPlace,
}: {
	places: readonly Place[];
	selectedCoordinates: { latitude: number; longitude: number } | null;
	selectedZoom: number | null;
	onSelectCoordinates: (coordinates: {
		latitude: number;
		longitude: number;
	}) => void;
	onSelectPlace: (place: Place) => void;
}) {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<MapLibreMap | null>(null);
	const selectedMarkerRef = useRef<Marker | null>(null);
	const selectedCoordinatesRef = useRef(selectedCoordinates);
	const selectedZoomRef = useRef(selectedZoom);
	const createSelectedMarkerRef = useRef<
		((coordinates: [number, number]) => Marker) | null
	>(null);
	selectedCoordinatesRef.current = selectedCoordinates;
	selectedZoomRef.current = selectedZoom;

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
			mapRef.current = map;
			map.on("style.load", () => {
				for (const layerId of SEA_LABEL_LAYER_IDS) {
					if (map.getLayer(layerId)) {
						map.setLayoutProperty(layerId, "visibility", "none");
					}
				}
			});
			map.addControl(new maplibregl.AttributionControl({ compact: true }));
			const showSelectedMarker = (coordinates: [number, number]) => {
				const selectedMarkerElement = document.createElement("div");
				selectedMarkerElement.className =
					"size-4 rounded-full border-2 border-white bg-blue-500 shadow-md";
				return new maplibregl.Marker({ element: selectedMarkerElement })
					.setLngLat(coordinates)
					.addTo(map);
			};
			createSelectedMarkerRef.current = showSelectedMarker;
			const initialSelectedCoordinates = selectedCoordinatesRef.current;
			selectedMarkerRef.current = initialSelectedCoordinates
				? showSelectedMarker([
						initialSelectedCoordinates.longitude,
						initialSelectedCoordinates.latitude,
					])
				: null;

			if (initialSelectedCoordinates) {
				map.once("load", () => {
					map.easeTo({
						center: [
							initialSelectedCoordinates.longitude,
							initialSelectedCoordinates.latitude,
						],
						zoom: selectedZoomRef.current ?? map.getZoom(),
						duration: 600,
					});
				});
			}

			map.on("click", (event) => {
				const coordinates: [number, number] = [
					event.lngLat.lng,
					event.lngLat.lat,
				];
				if (!selectedMarkerRef.current) {
					selectedMarkerRef.current = showSelectedMarker(coordinates);
				} else {
					selectedMarkerRef.current.setLngLat(coordinates);
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

			cleanup = () => {
				mapRef.current = null;
				selectedMarkerRef.current = null;
				createSelectedMarkerRef.current = null;
				map.remove();
			};
		}

		void initializeMap();
		return () => {
			isMounted = false;
			cleanup?.();
		};
	}, [onSelectCoordinates, onSelectPlace, places]);

	useEffect(() => {
		if (!selectedCoordinates || !mapRef.current) return;

		const coordinates: [number, number] = [
			selectedCoordinates.longitude,
			selectedCoordinates.latitude,
		];
		if (selectedMarkerRef.current) {
			selectedMarkerRef.current.setLngLat(coordinates);
		} else if (createSelectedMarkerRef.current) {
			selectedMarkerRef.current = createSelectedMarkerRef.current(coordinates);
		}
		mapRef.current.easeTo({
			center: coordinates,
			zoom: selectedZoom ?? mapRef.current.getZoom(),
			duration: 600,
		});
	}, [selectedCoordinates, selectedZoom]);

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
