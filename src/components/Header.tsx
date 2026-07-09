import { HStack } from "@astryxdesign/core/HStack";
import { VStack } from "@astryxdesign/core/VStack";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import TerraceLink from "#/components/TerraceLink";
import { getOwnerSession } from "#/lib/auth/serverFns";

const categories = ["about", "blog", "daily", "musings", "places"] as const;

function isActive(pathname: string, href: string) {
	if (href === "/about") {
		return pathname === "/" || pathname === "/about";
	}

	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
	const { pathname } = useLocation();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const checkedPathname = pathname;

		getOwnerSession()
			.then((session) => {
				if (isMounted && checkedPathname === window.location.pathname) {
					setIsLoggedIn(session != null);
				}
			})
			.catch(() => {
				if (isMounted && checkedPathname === window.location.pathname) {
					setIsLoggedIn(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [pathname]);

	const adminLinkHref = isLoggedIn
		? "/admin"
		: `/login?redirectUri=${encodeURIComponent(pathname)}`;

	return (
		<VStack
			as="header"
			className="relative select-none bg-white"
			hAlign="center"
		>
			<TerraceLink
				href={adminLinkHref}
				isStandalone
				variant="nav"
				className={[
					"absolute right-3 top-3 px-2 py-1 text-xs transition-opacity focus:opacity-100 focus:outline-none",
					isLoggedIn ? "opacity-100" : "opacity-0 hover:opacity-100",
				].join(" ")}
			>
				{isLoggedIn ? "Admin" : "Login"}
			</TerraceLink>
			<VStack className="mb-2 mt-6 sm:mb-5 sm:mt-10" hAlign="center">
				<TerraceLink
					href="/"
					isStandalone
					variant="header"
					className="px-5 py-2.5 focus:z-10 focus:outline-none"
				>
					<span className="font-inconsolata uppercase tracking-[3px]">
						Myeongjae Kim
					</span>
				</TerraceLink>
			</VStack>
			<HStack
				as="nav"
				aria-label="Primary navigation"
				className="font-inconsolata text-sm"
				gap={0}
				wrap="wrap"
				hAlign="center"
			>
				{categories.map((category) => {
					const href = `/${category}`;
					const active = isActive(pathname, href);

					return (
						<TerraceLink
							key={category}
							href={href}
							isStandalone
							variant="nav"
							active={active}
							className="px-2 py-1.5 capitalize focus:z-10 focus:outline-none"
						>
							{category}
						</TerraceLink>
					);
				})}
			</HStack>
		</VStack>
	);
}
