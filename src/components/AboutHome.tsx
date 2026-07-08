import TerraceLink from "#/components/TerraceLink";
import { aboutProfile } from "#/lib/site/about";
import { HStack } from "@astryxdesign/core/HStack";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export default function AboutHome() {
	return (
		<VStack as="main" className="w-full bg-white" hAlign="center">
			<Section variant="transparent" padding={0} className="mt-6 sm:mt-9">
				<img
					className="mb-6 h-52 w-52 select-none rounded object-cover drop-shadow-lg"
					src={aboutProfile.profile}
					alt={aboutProfile.name.en}
				/>
				<HStack
					className="relative mb-6 h-[46px] w-52 select-none"
					gap={0}
					hAlign="center"
				>
					<Text as="span" className="font-bad-script text-[2rem] text-black">
						{aboutProfile.name.en}
					</Text>
					<Text
						as="span"
						className="absolute left-[195px] whitespace-nowrap pt-4 text-black opacity-40"
					>
						({aboutProfile.name.kr})
					</Text>
				</HStack>
				<VStack as="ul" className="mx-auto w-[168px] list-none ps-0" gap={0}>
					{aboutProfile.descriptions.map((description) => (
						<HStack
							as="li"
							key={description.label}
							className="font-inconsolata -mb-1 h-[27px] leading-none"
							gap={0}
							vAlign="center"
						>
							<span className="material-icons mr-1 cursor-default select-none text-base text-black">
								{description.icon}
							</span>
							<Text
								as="span"
								className="font-inconsolata text-sm leading-none text-black"
							>
								{description.href ? (
									<TerraceLink
										href={description.href}
										isStandalone
										className="terrace-about-link"
									>
										{description.label}
									</TerraceLink>
								) : (
									description.label
								)}
							</Text>
						</HStack>
					))}
				</VStack>
			</Section>
		</VStack>
	);
}
