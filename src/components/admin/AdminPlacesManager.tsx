import { AlertDialog } from "@astryxdesign/core/AlertDialog";
import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Layout, LayoutContent, LayoutHeader } from "@astryxdesign/core/Layout";
import { NumberInput } from "@astryxdesign/core/NumberInput";
import { pixel, proportional, Table } from "@astryxdesign/core/Table";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AdminPlacesMap } from "#/components/admin/AdminPlacesMap";
import type { Place } from "#/core/place/domain";
import { createPlace, deletePlace } from "#/features/place/placeServerFns";

type PlaceRow = Record<string, unknown> & Place;

function formatCoordinate(value: number) {
	return value.toFixed(6);
}

export function AdminPlacesManager({
	initialPlaces,
}: {
	initialPlaces: readonly Place[];
}) {
	const [places, setPlaces] = useState<readonly Place[]>(initialPlaces);
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [pendingDeletion, setPendingDeletion] = useState<Place | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const addPlace = useCallback(
		async (coordinates: { latitude: number; longitude: number }) => {
			try {
				setIsCreating(true);
				const place = await createPlace({ data: coordinates });
				setPlaces((current) =>
					current.some((item) => item.id === place.id)
						? current
						: [...current, place],
				);
				setLatitude(null);
				setLongitude(null);
				toast.success("Place added");
			} catch (error) {
				toast.error(
					error instanceof Error ? error.message : "장소 추가에 실패했습니다.",
				);
			} finally {
				setIsCreating(false);
			}
		},
		[],
	);

	const handleMapClick = useCallback(
		(coordinates: { latitude: number; longitude: number }) => {
			setLatitude(Number(coordinates.latitude.toFixed(6)));
			setLongitude(Number(coordinates.longitude.toFixed(6)));
		},
		[],
	);

	const handleDelete = useCallback(async () => {
		if (!pendingDeletion) return;
		try {
			setIsDeleting(true);
			await deletePlace({ data: { id: pendingDeletion.id } });
			setPlaces((current) =>
				current.filter((place) => place.id !== pendingDeletion.id),
			);
			setPendingDeletion(null);
			toast.success("Place deleted");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "장소 삭제에 실패했습니다.",
			);
		} finally {
			setIsDeleting(false);
		}
	}, [pendingDeletion]);

	const columns = useMemo(
		() => [
			{
				key: "latitude",
				header: "Latitude",
				width: proportional(1, { minWidth: 150 }),
				renderCell: (place: PlaceRow) => formatCoordinate(place.latitude),
			},
			{
				key: "longitude",
				header: "Longitude",
				width: proportional(1, { minWidth: 150 }),
				renderCell: (place: PlaceRow) => formatCoordinate(place.longitude),
			},
			{
				key: "actions",
				header: "Actions",
				width: pixel(110),
				renderCell: (place: PlaceRow) => (
					<Button
						label="Delete"
						variant="destructive"
						size="sm"
						icon={<Trash2 size={14} />}
						onClick={() => setPendingDeletion(place)}
					/>
				),
			},
		],
		[],
	);

	return (
		<>
			<Layout
				height="fill"
				header={
					<LayoutHeader hasDivider>
						<HStack className="w-full px-6 py-4" hAlign="between" gap={3}>
							<VStack gap={0}>
								<Heading level={1} className="text-xl">
									Places
								</Heading>
								<Text className="text-sm text-gray-500">
									Click the map to select coordinates, then add the point.
								</Text>
							</VStack>
							<HStack gap={2}>
								<MapPin size={20} className="text-accent-fg" />
								<Text className="text-sm font-medium">
									{places.length} active places
								</Text>
							</HStack>
						</HStack>
					</LayoutHeader>
				}
			>
				<LayoutContent label="Places manager" isScrollable>
					<VStack className="p-6" gap={5}>
						<AdminPlacesMap
							places={places}
							onSelectCoordinates={handleMapClick}
							onSelectPlace={setPendingDeletion}
						/>
						<VStack
							className="rounded-lg border border-border bg-surface p-4"
							gap={3}
						>
							<Heading level={2} className="text-base">
								Add a place
							</Heading>
							<HStack gap={3} wrap="wrap" vAlign="end">
								<NumberInput
									label="Latitude"
									value={latitude}
									onChange={setLatitude}
									min={-90}
									max={90}
									step={0.000001}
									hasClear
								/>
								<NumberInput
									label="Longitude"
									value={longitude}
									onChange={setLongitude}
									min={-180}
									max={180}
									step={0.000001}
									hasClear
								/>
								<Button
									label="Add place"
									variant="primary"
									icon={<Plus size={16} />}
									isLoading={isCreating}
									isDisabled={latitude === null || longitude === null}
									clickAction={async () => {
										if (latitude !== null && longitude !== null)
											await addPlace({ latitude, longitude });
									}}
								/>
							</HStack>
						</VStack>
						{places.length > 0 ? (
							<Table
								data={places as PlaceRow[]}
								columns={columns}
								idKey="id"
								density="compact"
								dividers="grid"
								hasHover
							/>
						) : (
							<Text className="py-8 text-center text-sm text-gray-500">
								Add your first place from the map or coordinates.
							</Text>
						)}
					</VStack>
				</LayoutContent>
			</Layout>
			<AlertDialog
				isOpen={pendingDeletion !== null}
				onOpenChange={(isOpen) => {
					if (!isOpen && !isDeleting) setPendingDeletion(null);
				}}
				title="Delete place?"
				description="This point will be removed from the public map. It can be retained in the database but cannot be restored from this screen."
				actionLabel="Delete place"
				onAction={handleDelete}
				isActionLoading={isDeleting}
			/>
		</>
	);
}
