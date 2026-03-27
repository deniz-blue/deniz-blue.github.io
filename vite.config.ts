import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VirtualModule, SimpleSSG } from "@deniz-blue/vite-plugins";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},

	plugins: [
		react(),
		VirtualModule(
			"projects",
			async () => {
				const res = await fetch("https://raw.githubusercontent.com/deniz-blue/deniz-blue/refs/heads/main/projects.json");
				const json = await res.json();
				return `export const projects = ${JSON.stringify(json)};`;
			},
		),
		SimpleSSG(),
	],
})
