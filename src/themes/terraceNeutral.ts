import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

const suitFallbacks =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const terraceNeutralTheme = defineTheme({
	name: "terrace-neutral",
	extends: neutralTheme,
	typography: {
		scale: { base: 16, ratio: 1.2 },
		body: {
			family: "SUIT",
			fallbacks: suitFallbacks,
		},
		heading: {
			family: "SUIT",
			fallbacks: suitFallbacks,
			weights: { 3: "bold", 4: "bold" },
		},
		code: {
			family: "Inconsolata",
			fallbacks: "monospace",
		},
	},
});
