import { AstryxProvider } from "#/components/AstryxProvider";
import { VStack } from "@astryxdesign/core/VStack";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useLocation,
} from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { siteConstants } from "#/lib/site/constants";
import Footer from "../components/Footer";
import Header from "../components/Header";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: siteConstants.defaultTitle,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { pathname } = useLocation();
	const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script>
					{`window.Prism = window.Prism || {};
window.Prism.manual = true;`}
				</script>
				<HeadContent />
			</head>
			<body className="font-suit min-h-screen bg-white break-keep">
				<AstryxProvider>
					<VStack
						className="min-h-screen w-full bg-white"
						gap={0}
						hAlign="stretch"
					>
						<a className="terrace-skip-link" href="#astryx-app-shell-main">
							Skip to content
						</a>
						{!isAdminRoute && <Header />}
						<VStack
							id="astryx-app-shell-main"
							className="w-full flex-1 bg-white"
							gap={0}
							hAlign="stretch"
						>
							{children}
							{!isAdminRoute && <Footer />}
						</VStack>
					</VStack>
					<Toaster
						position="top-center"
						toastOptions={{
							style: {
								border: "1px solid #1A56DB",
								color: "#1A56DB",
								userSelect: "none",
								paddingLeft: "16px",
							},
							iconTheme: {
								primary: "#1A56DB",
								secondary: "#FFFAEE",
							},
						}}
					/>
				</AstryxProvider>
				<Scripts />
			</body>
		</html>
	);
}
