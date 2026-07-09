import { createFileRoute } from "@tanstack/react-router";
import AboutHome from "#/components/AboutHome";
import { siteMetadata } from "#/features/site/siteMetadata";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: [{ title: siteMetadata.createTitle("About") }],
	}),
	component: AboutHome,
});
