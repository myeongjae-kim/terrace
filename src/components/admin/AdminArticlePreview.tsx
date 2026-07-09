import TerraceMarkdownRenderer from "#/components/TerraceMarkdownRenderer";
import type { AdminArticleKind } from "#/lib/admin/articles";
import { Section } from "@astryxdesign/core/Section";
import { VStack } from "@astryxdesign/core/VStack";

export function AdminArticlePreview({
	kind,
	markdown,
}: {
	kind: AdminArticleKind;
	markdown: string;
}) {
	return (
		<Section
			variant="section"
			padding={0}
			height="100%"
			minHeight={0}
			className="overflow-hidden bg-white"
			role="region"
			aria-label={`${kind} body preview`}
		>
			{kind === "daily" ? (
				<VStack
					className="h-full min-h-0 overflow-auto px-4 py-1"
					gap={0}
					hAlign="stretch"
				>
					<VStack className="mx-auto w-full max-w-[32rem]" gap={0}>
						<Section
							variant="transparent"
							padding={0}
							className="daily-content terrace-daily-content overflow-visible"
						>
							<TerraceMarkdownRenderer
								className="terrace-daily-markdown m-4 text-black"
								markdown={markdown}
							/>
						</Section>
					</VStack>
				</VStack>
			) : (
				<VStack className="h-full min-h-0 overflow-auto" gap={0} hAlign="stretch">
					<VStack className="mx-auto w-full max-w-[50rem] p-4" gap={0}>
						<TerraceMarkdownRenderer
							className="terrace-blog-markdown mb-4 leading-[1.8] text-black"
							markdown={markdown}
						/>
					</VStack>
				</VStack>
			)}
		</Section>
	);
}
