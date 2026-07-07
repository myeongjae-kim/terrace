import { createFileRoute } from "@tanstack/react-router";
import AboutHome from "#/components/AboutHome";

export const Route = createFileRoute("/about")({
  component: AboutHome,
});
