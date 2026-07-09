// biome-ignore-all lint/security/noDangerouslySetInnerHtml: Site-owned markdown is rendered as HTML to match the original Terrace output.
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { type HTMLElement as ParsedHTMLElement, parse } from "node-html-parser";
import Prism from "prismjs";
import {
	type ComponentProps,
	forwardRef,
	useEffect,
	useMemo,
	useRef,
} from "react";
import toast from "react-hot-toast";
import { siteConstants } from "#/lib/site/constants";

import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-kotlin.min.js";
import "prismjs/components/prism-tsx.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-vim.min.js";
import "prismjs/components/prism-yaml.min.js";

type TerraceMarkdownRendererProps = ComponentProps<"div"> & {
	markdown: string;
	enableToc?: boolean;
};

type Heading = {
	depth: number;
	id: string;
	innerHTML: string;
};

const terraceMarked = new Marked(
	mangle(),
	gfmHeadingId(),
	markedHighlight({
		highlight(code: string, lang: string): string {
			if (Prism.languages[lang]) {
				return Prism.highlight(code, Prism.languages[lang], lang);
			}

			return code;
		},
	}),
);

function renderToc(headings: Heading[], curr = 0): string {
	if (headings.length === 0) {
		return "";
	}

	const { depth, id, innerHTML } = headings[curr];

	if (headings.length - 1 === curr) {
		return `<li><a class="${siteConstants.tocLinkDefaultClassName}" href="#${id}">${innerHTML}</a></li>`;
	}

	const nextDepth = headings[curr + 1].depth;

	if (nextDepth > depth) {
		let addDepth = "";
		for (let i = depth; i < nextDepth; i++) {
			addDepth += '<li class="list-none"><ul>';
		}

		return `<li><a class="${siteConstants.tocLinkDefaultClassName}" href="#${id}">${innerHTML}</a></li>${addDepth}${renderToc(headings, curr + 1)}`;
	}

	if (nextDepth < depth) {
		let minusDepth = "";
		for (let i = nextDepth; i < depth; i++) {
			minusDepth += "</ul></li>";
		}

		return `<li><a class="${siteConstants.tocLinkDefaultClassName}" href="#${id}">${innerHTML}</a></li>${minusDepth}${renderToc(headings, curr + 1)}`;
	}

	return `<li><a class="${siteConstants.tocLinkDefaultClassName}" href="#${id}">${innerHTML}</a></li>${renderToc(headings, curr + 1)}`;
}

function TableOfContents({ htmlElement }: { htmlElement: ParsedHTMLElement }) {
	const headings: Heading[] = htmlElement
		.querySelectorAll("h1, h2, h3, h4, h5, h6")
		.map((block) => ({
			depth: Number.parseInt(block.tagName[1], 10),
			id: block.id,
			innerHTML: block.innerHTML,
		}));

	if (headings.length === 0) {
		return null;
	}

	return (
		<nav
			id={siteConstants.tocWrapperNav}
			className="mb-4 flex max-w-md pb-2 2xl:fixed 2xl:left-2 2xl:top-2 2xl:max-h-[calc(100vh-16px)] 2xl:max-w-xs 2xl:overflow-y-auto"
		>
			<div className="terrace-toc rounded-lg bg-stone-50 p-2 text-sm leading-6 2xl:bg-transparent">
				<span
					id={siteConstants.tocId}
					className={`select-none font-bold ${siteConstants.tocLinkDefaultClassName}`}
				>
					목차
				</span>
				<div
					dangerouslySetInnerHTML={{
						__html: `<ul>${renderToc(headings)}</ul>`,
					}}
				/>
			</div>
		</nav>
	);
}

const TerraceMarkdownRenderer = forwardRef<
	HTMLDivElement,
	TerraceMarkdownRendererProps
>(({ className, markdown, style, enableToc, ...props }, ref) => {
	const { contentHtml, tocHtmlElement } = useMemo(() => {
		const html = terraceMarked.parse(markdown) as string;
		const parsedForToc = parse(html);
		const parsedForContent = parse(html);

		parsedForContent
			.querySelectorAll("h1, h2, h3, h4, h5, h6")
			.forEach((block) => {
				["flex", "gap-1", "items-center"].forEach((className) => {
					block.classList.add(className);
				});

				const headingId = block.id;
				const headingHtml = block.innerHTML;
				block.innerHTML = `<span>${headingHtml}</span>
<a class="${siteConstants.headingUrlCopyLinkClass}" href="#${headingId}" aria-label="Copy heading link">
	<span class="material-icons cursor-pointer select-none" style="font-size: 1.2em">link</span>
</a>
<span class="flex-1"></span>
<a class="${siteConstants.tocLinkClass} 2xl:hidden" href="#${siteConstants.tocId}" ${siteConstants.tocDataHeadingIdPropertyName}="${headingId}" aria-label="Jump to table of contents">
	<span class="material-icons cursor-pointer select-none opacity-50" style="font-size: 1.2em">toc</span>
</a>`;
			});

		return {
			contentHtml: parsedForContent.innerHTML,
			tocHtmlElement: parsedForToc,
		};
	}, [markdown]);

	return (
		<>
			{enableToc && <TableOfContents htmlElement={tocHtmlElement} />}
			<div
				ref={ref}
				className={["terrace-markdown", className].filter(Boolean).join(" ")}
				style={{ overflowWrap: "anywhere", ...style }}
				suppressHydrationWarning
				{...props}
				dangerouslySetInnerHTML={{ __html: contentHtml }}
			/>
		</>
	);
});

TerraceMarkdownRenderer.displayName = "TerraceMarkdownRenderer";

export function TerraceMarkdownRendererContainer(
	props: TerraceMarkdownRendererProps,
) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const rootElement = ref.current;
		const registeredHandlers: Array<[Element, EventListener]> = [];

		rootElement
			.querySelectorAll(`a.${siteConstants.headingUrlCopyLinkClass}`)
			.forEach((element) => {
				element.removeAttribute("onClick");

				const handleClick = () => {
					void navigator.clipboard.writeText(
						window.location.origin +
							window.location.pathname +
							element.getAttribute("href"),
					);
					toast.success("링크를 복사했습니다.");
				};

				element.addEventListener("click", handleClick);
				registeredHandlers.push([element, handleClick]);
			});

		rootElement
			.querySelectorAll(`a.${siteConstants.tocLinkClass}`)
			.forEach((element) => {
				const handleClick = () => {
					const headingId = element.getAttribute(
						siteConstants.tocDataHeadingIdPropertyName,
					);

					toast.success(
						<div>
							목차로 이동했습니다.
							<a
								className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white no-underline transition-colors hover:bg-blue-700 hover:text-white"
								href={headingId ? `#${headingId}` : "#"}
							>
								되돌아가기
							</a>
						</div>,
					);
				};

				element.addEventListener("click", handleClick);
				registeredHandlers.push([element, handleClick]);
			});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (document.documentElement.scrollTop === 0) {
						return;
					}

					const id = entry.target.getAttribute("id");
					const tocLinks = [
						...((document
							.getElementById(siteConstants.tocWrapperNav)
							?.querySelectorAll("li a") || []) as NodeListOf<HTMLElement>),
					];
					const targetLinkIndex = tocLinks.findIndex(
						(element) => element.getAttribute("href") === `#${id}`,
					);
					const interactionDirection =
						entry.boundingClientRect.y < 0 ? "top" : "bottom";
					const elementInOrOut = entry.intersectionRatio > 0 ? "in" : "out";

					if (interactionDirection !== "bottom") {
						return;
					}

					tocLinks.forEach((element) => {
						element.classList.remove("font-bold");
						element.classList.add(siteConstants.tocLinkDefaultClassName);
					});

					if (elementInOrOut === "in") {
						tocLinks[targetLinkIndex]?.classList.remove(
							siteConstants.tocLinkDefaultClassName,
						);
						tocLinks[targetLinkIndex]?.classList.add("font-bold");
					} else {
						tocLinks[targetLinkIndex - 1]?.classList.remove(
							siteConstants.tocLinkDefaultClassName,
						);
						tocLinks[targetLinkIndex - 1]?.classList.add("font-bold");
					}
				});
			},
			{
				rootMargin: "0px 0px -70% 0px",
			},
		);

		rootElement
			.querySelectorAll("h1, h2, h3, h4, h5, h6")
			.forEach((element) => {
				observer.observe(element);
			});

		return () => {
			registeredHandlers.forEach(([element, handler]) => {
				element.removeEventListener("click", handler);
			});
			observer.disconnect();
		};
	});

	return <TerraceMarkdownRenderer {...props} ref={ref} />;
}

export default TerraceMarkdownRenderer;
