import { createFileRoute } from "@tanstack/react-router";
import AboutHome from "#/components/AboutHome";
import { siteConstants } from "#/lib/site/constants";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: siteConstants.defaultTitle }],
	}),
	component: AboutHome,
});
