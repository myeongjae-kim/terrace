import { createFileRoute } from "@tanstack/react-router";
import AboutHome from "#/components/AboutHome";
import { siteMetadata } from "#/features/site/siteMetadata";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: siteMetadata.defaultTitle }],
	}),
	component: AboutHome,
});
