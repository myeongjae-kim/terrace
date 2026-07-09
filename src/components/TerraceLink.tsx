import {
	type Link as AstryxLinkComponent,
	Link as AstryxLink,
} from "@astryxdesign/core/Link";
import { useState, type ComponentProps } from "react";

type AstryxLinkProps = ComponentProps<typeof AstryxLinkComponent>;

type TerraceLinkVariant =
	| "default"
	| "header"
	| "nav"
	| "blogList"
	| "dailyList"
	| "articleTitle"
	| "button"
	| "pagination";

type TerraceLinkProps = AstryxLinkProps & {
	active?: boolean;
	variant?: TerraceLinkVariant;
};

const variantClassNames: Record<TerraceLinkVariant, string> = {
	default: "terrace-link-default",
	header: "terrace-header-link",
	nav: "terrace-nav-link",
	blogList: "terrace-blog-list-link",
	dailyList: "terrace-daily-list-link",
	articleTitle: "terrace-article-title-link",
	button: "terrace-button-link",
	pagination: "terrace-pagination-link",
};

function classNames(...values: Array<string | false | null | undefined>) {
	return values.filter(Boolean).join(" ");
}

export default function TerraceLink({
	active = false,
	className,
	onBlur,
	onFocus,
	onMouseEnter,
	onMouseLeave,
	variant = "default",
	...props
}: TerraceLinkProps) {
	const [isInteractive, setIsInteractive] = useState(false);

	return (
		<AstryxLink
			{...props}
			onBlur={(event) => {
				setIsInteractive(false);
				onBlur?.(event);
			}}
			onFocus={(event) => {
				setIsInteractive(true);
				onFocus?.(event);
			}}
			onMouseEnter={(event) => {
				setIsInteractive(true);
				onMouseEnter?.(event);
			}}
			onMouseLeave={(event) => {
				setIsInteractive(false);
				onMouseLeave?.(event);
			}}
			className={classNames(
				"terrace-link-base",
				variantClassNames[variant],
				variant === "nav" && active && "terrace-nav-link-active",
				isInteractive && "terrace-link-interactive",
				className,
			)}
		/>
	);
}
