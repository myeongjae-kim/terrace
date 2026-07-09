import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import PlacesMap from "#/components/PlacesMap";
import { siteConstants } from "#/lib/site/constants";

export const Route = createFileRoute("/places")({
	head: () => ({
		meta: [{ title: siteConstants.createTitle("Places") }],
	}),
	component: PlacesPage,
});

function PlacesPage() {
	return (
		<VStack
			as="main"
			className="w-full bg-white"
			hAlign="center"
			aria-label="Places"
		>
			<Heading
				level={1}
				className="terrace-page-header font-bad-script text-center text-black"
			>
				Places
			</Heading>
			<Text as="p" className="font-light text-black">
				where I have been
			</Text>
			<VStack width="100%" className="px-4" hAlign="center">
				<PlacesMap />
			</VStack>
		</VStack>
	);
}
