import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { applicationContext } from "#/core/config/applicationContext";
import { siteConstants } from "#/lib/site/constants";

const listMusings = createServerFn({ method: "GET" }).handler(async () => {
	return await applicationContext()
		.get("ListPublishedMusingsUseCase")
		.list({ limit: 100, offset: 0 });
});

export const Route = createFileRoute("/musings")({
	head: () => ({
		meta: [{ title: siteConstants.createTitle("Musings") }],
	}),
	loader: async () => await listMusings(),
	component: MusingsPage,
});

function MusingsPage() {
	const musings = Route.useLoaderData();

	return (
		<VStack
			as="main"
			className="flex flex-col items-center justify-between bg-white"
			hAlign="center"
		>
			<Section variant="transparent" padding={0} className="contents">
				<Heading
					level={1}
					className="terrace-page-header font-bad-script text-center text-black"
				>
					Quotes
				</Heading>
				<VStack className="mb-14 flex max-w-xl flex-col gap-3 px-8 text-center">
					{musings.items.map((musing) => {
						const isKorean = musing.language === "KO";
						const fontClass = isKorean ? "font-noto-serif-kr" : "font-bad-script";
						const italicClass = isKorean ? "italic" : "";

						return (
							<VStack key={musing.id} className={fontClass} gap={0}>
								<Text
									as="p"
									className={`${fontClass} whitespace-pre-wrap text-lg leading-9 text-black ${italicClass}`}
								>
									“{musing.quote ?? ""}”
								</Text>
								<Text
									as="p"
									className={`${fontClass} text-[0.9rem] text-black ${italicClass}`}
								>
									- {musing.from}
								</Text>
							</VStack>
						);
					})}
					{musings.items.length === 0 && (
						<Text className="text-center text-gray-500">
							Published musings will appear here.
						</Text>
					)}
				</VStack>
			</Section>
		</VStack>
	);
}
