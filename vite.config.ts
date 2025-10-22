import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { reactRouter } from "@react-router/dev/vite";
// import babel from "vite-plugin-babel";

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		reactRouter(),
		// babel({
		// 	filter: /\.[jt]sx?$/,
		// 	babelConfig: {
		// 		presets: ["@babel/preset-typescript"], // if you use TypeScript
		// 		plugins: [
		// 			["babel-plugin-react-compiler", {}],
		// 		],
		// 	},
		// }),
	],
	resolve: {
		alias: {
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
		},
	},
})
