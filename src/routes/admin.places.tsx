import { createFileRoute } from "@tanstack/react-router";
import { AdminPlacesManager } from "#/components/admin/AdminPlacesManager";
import { listPlaces } from "#/features/place/placeServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";

export const Route = createFileRoute("/admin/places")({
	head: () => ({ meta: [{ title: siteMetadata.createTitle("Admin Places") }] }),
	loader: async () => await listPlaces(),
	component: AdminPlacesPage,
});

function AdminPlacesPage() {
	return <AdminPlacesManager initialPlaces={Route.useLoaderData()} />;
}
