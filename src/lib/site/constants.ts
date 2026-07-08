export const siteConstants = {
	defaultTitle: "김명재, Myeongjae Kim",
	createTitle: (title?: string | null) =>
		`${title ? `${title} :: ` : ""}김명재, Myeongjae Kim`,
	tocId: "toc",
	headingUrlCopyLinkClass: "heading-url-copy-link",
	tocLinkClass: "toc-link",
	tocDataHeadingIdPropertyName: "data-heading-id",
	tocWrapperNav: "toc-wrapper-nav",
	tocLinkDefaultClassName: "2xl:opacity-70",
};
