"use client";

import type { Article } from "#/core/article/domain";
import {
	type AdminArticleKind,
	articleEditPath,
	articleKindLabel,
	articleKindNewPath,
} from "#/lib/admin/articles";
import { setArticlePublished } from "#/lib/admin/articleServerFns";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { Heading } from "@astryxdesign/core/Heading";
import { Layout, LayoutContent, LayoutHeader } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { Table, pixel, proportional } from "@astryxdesign/core/Table";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import { useRouter } from "@tanstack/react-router";
import { Check, Plus, X } from "lucide-react";
import { useMemo } from "react";

type AdminArticleRow = Record<string, unknown> & {
	id: string;
	seq: number | null;
	title: string;
	slug: string;
	publishedAt: string | null;
	updatedAt: string | null;
};

type AdminPaginationItem =
	| { type: "page"; page: number }
	| { type: "ellipsis"; key: string };

const primaryLinkClassName =
	"inline-flex h-9 items-center gap-2 rounded-lg bg-accent-bg px-3 text-sm font-medium text-on-accent no-underline hover:text-on-accent";
const paginationLinkClassName =
	"rounded-lg px-3 py-1.5 text-sm no-underline hover:bg-muted";
const paginationNumberClassName =
	"inline-flex min-w-8 justify-center px-2";

function classNames(...values: Array<string | false | null | undefined>) {
	return values.filter(Boolean).join(" ");
}

function formatDateTime(value: string | null) {
	if (!value) return "-";

	return new Intl.DateTimeFormat("ko-KR", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

function toRow(article: Article): AdminArticleRow {
	return {
		id: article.id,
		seq: article.seq,
		title: article.title ?? "(untitled)",
		slug: article.slug ?? "",
		publishedAt: article.publishedAt,
		updatedAt: article.updatedAt,
	};
}

function createPaginationItems({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}): AdminPaginationItem[] {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, index) => ({
			type: "page",
			page: index + 1,
		}));
	}

	const pages = new Set<number>([
		1,
		totalPages,
		currentPage - 1,
		currentPage,
		currentPage + 1,
	]);
	const boundedPages = Array.from(pages)
		.filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
		.sort((left, right) => left - right);
	const items: AdminPaginationItem[] = [];

	for (const pageNumber of boundedPages) {
		const previousItem = items.at(-1);
		if (
			previousItem?.type === "page" &&
			pageNumber - previousItem.page > 1
		) {
			items.push({ type: "ellipsis", key: `${previousItem.page}-${pageNumber}` });
		}

		items.push({ type: "page", page: pageNumber });
	}

	return items;
}

export function AdminArticleTable({
	kind,
	articles,
	page,
	totalPages,
}: {
	kind: AdminArticleKind;
	articles: readonly Article[];
	page: number;
	totalPages?: number;
}) {
	const router = useRouter();
	const rows = useMemo(() => articles.map(toRow), [articles]);
	const title = articleKindLabel(kind);
	const paginationItems = useMemo(
		() =>
			totalPages
				? createPaginationItems({ currentPage: page, totalPages })
				: [],
		[page, totalPages],
	);

	const columns = useMemo(
		() => [
			{
				key: "seq",
				header: "Seq",
				width: pixel(84),
				renderCell: (row: AdminArticleRow) => row.seq ?? "-",
			},
			{
				key: "title",
				header: "Title",
				width: proportional(2, { minWidth: 260 }),
				renderCell: (row: AdminArticleRow) => (
					<VStack gap={0}>
						<Link
							href={articleEditPath(kind, row.id)}
							isStandalone
							color="accent"
							className="font-medium"
						>
							{row.title}
						</Link>
						<Link
							href={articleEditPath(kind, row.id)}
							isStandalone
							color="neutral"
							className="text-xs text-gray-500 hover:text-blue-700"
						>
							{row.slug || "(missing slug)"}
						</Link>
					</VStack>
				),
			},
			{
				key: "status",
				header: "Status",
				width: pixel(132),
				renderCell: (row: AdminArticleRow) =>
					row.publishedAt ? (
						<Token label="Published" color="green" size="sm" />
					) : (
						<Token label="Draft" color="gray" size="sm" />
					),
			},
			{
				key: "updatedAt",
				header: "Updated",
				width: proportional(1, { minWidth: 180 }),
				renderCell: (row: AdminArticleRow) => formatDateTime(row.updatedAt),
			},
			{
				key: "actions",
				header: "Actions",
				width: pixel(140),
				renderCell: (row: AdminArticleRow) => (
					<HStack gap={1} wrap="wrap">
						<Button
							label={row.publishedAt ? "Unpublish" : "Publish"}
							variant={row.publishedAt ? "secondary" : "primary"}
							size="sm"
							icon={row.publishedAt ? <X size={14} /> : <Check size={14} />}
							clickAction={async () => {
								await setArticlePublished({
									data: {
										kind,
										id: row.id,
										isPublished: !row.publishedAt,
									},
								});
								await router.invalidate();
							}}
						/>
					</HStack>
				),
			},
		],
		[kind, router],
	);

	return (
		<Layout
			height="fill"
			header={
				<LayoutHeader hasDivider>
					<HStack className="w-full px-6 py-4" hAlign="between" gap={3}>
						<VStack gap={0}>
							<Heading level={1} className="text-xl">
								{title}
							</Heading>
							<Text className="text-sm text-gray-500">
								Manage published and draft entries.
							</Text>
						</VStack>
						<Link
							color="inherit"
							isStandalone
							className={primaryLinkClassName}
							href={articleKindNewPath(kind)}
						>
							<Plus size={16} />
							New {title}
						</Link>
					</HStack>
				</LayoutHeader>
			}
		>
			<LayoutContent label={`${title} content table`}>
				<VStack className="p-6" gap={4}>
					{rows.length > 0 ? (
						<Table
							data={rows}
							columns={columns}
							idKey="id"
							density="compact"
							dividers="grid"
							hasHover
							textOverflow="truncate"
						/>
					) : (
						<VStack className="py-16" hAlign="center" gap={3}>
							<Badge label="Empty" variant="neutral" />
							<Text className="text-sm text-gray-500">
								No {title.toLowerCase()} entries yet.
							</Text>
						</VStack>
					)}
					<HStack hAlign="between">
						<Text className="text-sm text-gray-500">
							Page {page}
							{totalPages ? ` of ${totalPages}` : ""}
						</Text>
						<HStack gap={1}>
							<Link
								color="neutral"
								isStandalone
								isDisabled={page <= 1}
								className={paginationLinkClassName}
								href={`/admin/${kind}?page=${page - 1}`}
							>
								Previous
							</Link>
							{paginationItems.map((item) =>
								item.type === "ellipsis" ? (
									<Text
										key={item.key}
										className="min-w-6 text-center text-sm text-gray-400"
									>
										...
									</Text>
								) : (
									<Link
										key={item.page}
										color="neutral"
										isStandalone
										isDisabled={item.page === page}
										aria-current={item.page === page ? "page" : undefined}
										className={classNames(
											paginationLinkClassName,
											paginationNumberClassName,
											item.page === page && "bg-muted opacity-100",
										)}
										href={`/admin/${kind}?page=${item.page}`}
									>
										{item.page}
									</Link>
								),
							)}
							<Link
								color="neutral"
								isStandalone
								isDisabled={totalPages != null && page >= totalPages}
								className={paginationLinkClassName}
								href={`/admin/${kind}?page=${page + 1}`}
							>
								Next
							</Link>
						</HStack>
					</HStack>
				</VStack>
			</LayoutContent>
		</Layout>
	);
}
