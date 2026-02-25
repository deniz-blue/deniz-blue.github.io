import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		react(),
		{
			name: "virtual-projects",
			resolveId(id) {
				if (id === "virtual:projects") return id;
			},
			async load(id) {
				if (id !== "virtual:projects") return null;

				const res = await fetch("https://raw.githubusercontent.com/deniz-blue/deniz-blue/refs/heads/main/projects.json");
				const json = await res.json();
				return `export const projects = ${JSON.stringify(json)};`;
			},
		},
		{
			name: "ssg-transform",
			async transformIndexHtml(html, { server, bundle }) {
				if (server) {
					const { render } = await server.ssrLoadModule(path.resolve(__dirname, "src/entry.server.tsx"));
					const appHtml = render();
					return html.replace("<!-- @ -->", appHtml);
				};

				// if (bundle) {
				// 	const { render } = await import('./dist/server/entry-server.js');
				// 	return html.replace('', render());
				// };

				return html;
			},
		},
		{
			name: "prerender",
			async closeBundle() {
				const distPath = path.resolve(__dirname, "dist");
				const ssrPath = path.resolve(distPath, "server/entry.server.js");
				const templatePath = path.resolve(distPath, "index.html");
				if (!fs.existsSync(ssrPath)) return;
				const { render } = await import(ssrPath);
				let template = fs.readFileSync(templatePath, "utf-8");
				const appHtml = render();
				const html = template.replace("<!-- @ -->", appHtml);
				fs.writeFileSync(templatePath, html);
				console.log("prerendering complete");
			},
		},
	],

	build: {
		ssr: false,
	},
})
