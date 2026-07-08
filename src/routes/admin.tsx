import { AdminShell } from "#/components/admin/AdminShell";
import { getOwnerSession } from "#/lib/auth/serverFns";
import { siteConstants } from "#/lib/site/constants";
import {
	createFileRoute,
	Outlet,
	redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	head: () => ({
		meta: [
			{ title: siteConstants.createTitle("Admin") },
			{ name: "description", content: "콘텐츠 관리" },
		],
	}),
	beforeLoad: async ({ location }) => {
		const session = await getOwnerSession();

		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirectUri: location.href },
			});
		}

		if (location.pathname === "/admin") {
			throw redirect({ to: "/admin/blog", search: { page: 1 } });
		}

		return { session };
	},
	component: AdminRoute,
});

function AdminRoute() {
	return (
		<AdminShell>
			<Outlet />
		</AdminShell>
	);
}
