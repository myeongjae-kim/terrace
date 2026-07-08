import { Theme } from "@astryxdesign/core";
import { LinkProvider } from "@astryxdesign/core/Link";
import type { ThemeMode } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import { Link as RouterLink } from "@tanstack/react-router";
import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
} from "react";

type AstryxThemeContextValue = {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
};

const AstryxThemeContext = createContext<AstryxThemeContextValue | null>(null);

export function AstryxProvider({ children }: { children: ReactNode }) {
	const value = useMemo<AstryxThemeContextValue>(
		() => ({
			mode: "light",
			setMode() {},
		}),
		[],
	);

	return (
		<AstryxThemeContext.Provider value={value}>
			<LinkProvider component={RouterLink}>
				<Theme theme={neutralTheme} mode="light">
					{children}
				</Theme>
			</LinkProvider>
		</AstryxThemeContext.Provider>
	);
}

export function useAstryxTheme() {
	const context = useContext(AstryxThemeContext);

	if (!context) {
		throw new Error("useAstryxTheme must be used within AstryxProvider");
	}

	return context;
}
