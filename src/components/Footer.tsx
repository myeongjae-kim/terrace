import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import TerraceLink from "#/components/TerraceLink";

export default function Footer() {
	return (
		<VStack
			as="footer"
			className="mt-auto flex h-10 justify-center bg-white"
			hAlign="center"
		>
			<Text
				as="p"
				type="supporting"
				className="flex-shrink-0 select-none text-xs text-gray-900"
				justify="center"
			>
				If you like my website, you can copy it from{" "}
				<TerraceLink
					href="https://github.com/myeongjae-kim/terrace"
					isStandalone
					className="terrace-footer-link"
				>
					this repository
				</TerraceLink>
				.
			</Text>
		</VStack>
	);
}
