import { Button } from "@astryxdesign/core/Button";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { Dialog } from "@astryxdesign/core/Dialog";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import {
	Layout,
	LayoutContent,
	LayoutFooter,
	LayoutHeader,
} from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { NumberInput } from "@astryxdesign/core/NumberInput";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { ExternalLink, Maximize2, Save, X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AdminArticlePreview } from "#/components/admin/AdminArticlePreview";
import type { Article } from "#/core/article/domain";
import {
	type AdminArticleKind,
	articleEditPath,
	articleKindLabel,
	articleKindListPath,
} from "#/features/admin/article-management/articleKinds";
import {
	createAdminArticle,
	updateAdminArticle,
} from "#/features/admin/article-management/articleServerFns";
import { articlePermalink } from "#/features/publishing/articlePresentation";

type AdminArticleFormMode = "create" | "edit";

function articleValue(value: string | null | undefined) {
	return value ?? "";
}

function useDebouncedValue<T>(value: T, delayMs: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setDebouncedValue(value);
		}, delayMs);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [delayMs, value]);

	return debouncedValue;
}

export function AdminArticleForm({
	kind,
	mode,
	initialArticle,
	nextSeq,
}: {
	kind: AdminArticleKind;
	mode: AdminArticleFormMode;
	initialArticle?: Article;
	nextSeq?: number;
}) {
	const label = articleKindLabel(kind);
	const navigate = useNavigate();
	const router = useRouter();
	const [seq, setSeq] = useState(initialArticle?.seq ?? nextSeq ?? 1);
	const [title, setTitle] = useState(articleValue(initialArticle?.title));
	const [slug, setSlug] = useState(articleValue(initialArticle?.slug));
	const [content, setContent] = useState(articleValue(initialArticle?.content));
	const [isPublished, setIsPublished] = useState(
		initialArticle?.publishedAt != null,
	);
	const [persistedIsPublished, setPersistedIsPublished] = useState(
		initialArticle?.publishedAt != null,
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
	const debouncedContent = useDebouncedValue(content, 400);
	const publicArticleHref = initialArticle
		? articlePermalink(kind === "blog" ? "/blog" : "/daily", initialArticle)
		: null;

	async function handleSubmit(event: FormEvent<HTMLElement>) {
		event.preventDefault();
		setErrorMessage(null);

		try {
			setIsSaving(true);
			const payload = {
				kind,
				seq,
				title,
				slug,
				content,
				isPublished,
			};
			const article =
				mode === "create"
					? await createAdminArticle({ data: payload })
					: await updateAdminArticle({
							data: {
								...payload,
								id: initialArticle?.id ?? "",
							},
						});

			setPersistedIsPublished(article.publishedAt != null);
			await router.invalidate({ sync: true });

			toast.success(mode === "create" ? "Created" : "Saved");

			if (mode === "create") {
				await navigate({ to: articleEditPath(kind, article.id) });
			}
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "저장에 실패했습니다.",
			);
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<>
			<Layout
				height="fill"
				header={
					<LayoutHeader hasDivider>
						<HStack className="w-full px-6 py-4" hAlign="between" gap={3}>
							<VStack gap={0}>
								<HStack gap={2}>
									<Heading level={1} className="text-xl">
										{mode === "create" ? `New ${label}` : `Edit ${label}`}
									</Heading>
									{mode === "edit" && (
										<HStack gap={1}>
											<StatusDot
												variant={persistedIsPublished ? "success" : "warning"}
												label={persistedIsPublished ? "Published" : "Draft"}
											/>
											<Text className="text-sm font-medium text-secondary">
												{persistedIsPublished ? "Published" : "Draft"}
											</Text>
										</HStack>
									)}
								</HStack>
								<Text className="text-sm text-gray-500">
									Write Markdown content and choose publish state.
								</Text>
							</VStack>
							<HStack gap={2} wrap="wrap">
								{publicArticleHref && (
									<Button
										label="View article"
										href={publicArticleHref}
										target="_blank"
										rel="noopener noreferrer"
										variant="secondary"
										size="sm"
										icon={<ExternalLink size={16} />}
										className="bg-surface hover:bg-muted"
									/>
								)}
								<Button
									label="Focus preview"
									variant="secondary"
									size="sm"
									icon={<Maximize2 size={16} />}
									clickAction={() => {
										setIsPreviewDialogOpen(true);
									}}
								/>
							</HStack>
						</HStack>
					</LayoutHeader>
				}
				footer={
					<LayoutFooter hasDivider>
						<HStack className="w-full px-6 py-4" hAlign="between">
							<Link
								color="secondary"
								isStandalone
								className="rounded-lg px-3 py-1.5 text-sm no-underline hover:bg-muted"
								href={articleKindListPath(kind)}
							>
								Cancel
							</Link>
							<Button
								label="Save changes"
								variant="primary"
								type="submit"
								form="admin-article-form"
								icon={<Save size={16} />}
								isLoading={isSaving}
							/>
						</HStack>
					</LayoutFooter>
				}
			>
				<LayoutContent
					label={`${label} editor`}
					isScrollable={false}
					padding={0}
				>
					<Grid
						columns={{ minWidth: 420, max: 2, repeat: "fit" }}
						height="100%"
						minHeight={0}
						className="min-h-0 overflow-auto p-6 lg:overflow-hidden"
						gap={4}
					>
						<VStack
							id="admin-article-form"
							as="form"
							className="min-w-0 lg:h-full lg:min-h-0 lg:overflow-auto lg:pr-2 lg:pb-2"
							gap={4}
							onSubmit={handleSubmit}
						>
							<HStack gap={3} wrap="wrap">
								<NumberInput
									label="Sequence"
									value={seq}
									onChange={setSeq}
									min={1}
									step={1}
									isIntegerOnly
									isRequired
								/>
								<CheckboxInput
									label="Published"
									description="Unchecked entries remain as drafts."
									value={isPublished}
									onChange={setIsPublished}
								/>
							</HStack>
							<TextInput
								label="Title"
								value={title}
								onChange={setTitle}
								isRequired
								hasAutoFocus
							/>
							<TextInput
								label="Slug"
								value={slug}
								onChange={setSlug}
								description="The existing public URL keeps using this slug."
								isRequired
							/>
							<TextArea
								label="Content"
								value={content}
								onChange={setContent}
								rows={22}
								hasSpellCheck={false}
								isRequired
							/>
							{errorMessage && (
								<Text className="text-sm text-red-600">{errorMessage}</Text>
							)}
						</VStack>
						<AdminArticlePreview kind={kind} markdown={debouncedContent} />
					</Grid>
				</LayoutContent>
			</Layout>
			<Dialog
				isOpen={isPreviewDialogOpen}
				onOpenChange={setIsPreviewDialogOpen}
				variant="fullscreen"
				padding={0}
				aria-label={`${label} preview`}
			>
				<Layout
					height="fill"
					content={
						<LayoutContent
							label={`${label} focused preview`}
							isScrollable={false}
							padding={0}
						>
							<HStack className="fixed right-8 top-6 z-20" hAlign="end">
								<IconButton
									label="Close preview"
									tooltip="Close preview"
									variant="secondary"
									size="sm"
									icon={<X size={18} />}
									clickAction={() => {
										setIsPreviewDialogOpen(false);
									}}
								/>
							</HStack>
							<AdminArticlePreview kind={kind} markdown={debouncedContent} />
						</LayoutContent>
					}
				/>
			</Dialog>
		</>
	);
}
