import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import TerraceLink from "#/components/TerraceLink";

type TerracePaginationProps = {
	currentPage: number;
	totalPages?: number;
	createHref: (pageNumber: number) => string;
};

function createRange(start: number, end: number) {
	return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => {
		return start + index;
	});
}

function PageNavigation({
	children,
	disabled,
	href,
}: {
	children: ReactNode;
	disabled: boolean;
	href: string;
}) {
	const className =
		"flex h-8 items-center justify-center bg-white px-3 leading-tight text-gray-500";

	if (disabled) {
		return (
			<Text as="span" className={`${className} cursor-default opacity-10`}>
				{children}
			</Text>
		);
	}

	return (
		<TerraceLink
			href={href}
			isStandalone
			className={`${className} hover:bg-gray-100 hover:text-gray-700`}
		>
			{children}
		</TerraceLink>
	);
}

function PageNumber({
	current,
	href,
	pageNumber,
}: {
	current: boolean;
	href: string;
	pageNumber: number;
}) {
	return (
		<TerraceLink
			href={current ? "#" : href}
			isStandalone
			aria-current={current ? "page" : undefined}
			className={[
				"mx-0.5 flex h-8 items-center justify-center rounded px-3 leading-tight",
				current
					? "z-10 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
					: "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700",
			].join(" ")}
		>
			{pageNumber}
		</TerraceLink>
	);
}

export default function TerracePagination({
	currentPage,
	totalPages = 1,
	createHref,
}: TerracePaginationProps) {
	if (totalPages <= 0) {
		return null;
	}

	return (
		<HStack
			as="nav"
			aria-label="Page navigation"
			className="select-none py-1"
			hAlign="center"
			gap={0}
		>
			<PageNavigation
				disabled={currentPage === 1}
				href={createHref(currentPage - 1)}
			>
				<span className="sr-only">Previous</span>
				<ChevronLeft aria-hidden className="h-2.5 w-2.5" strokeWidth={3} />
			</PageNavigation>
			{createRange(1, totalPages).map((pageNumber) => (
				<PageNumber
					key={pageNumber}
					current={pageNumber === currentPage}
					href={createHref(pageNumber)}
					pageNumber={pageNumber}
				/>
			))}
			<PageNavigation
				disabled={currentPage === totalPages}
				href={createHref(currentPage + 1)}
			>
				<span className="sr-only">Next</span>
				<ChevronRight aria-hidden className="h-2.5 w-2.5" strokeWidth={3} />
			</PageNavigation>
		</HStack>
	);
}
