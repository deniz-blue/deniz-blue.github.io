import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
	plugins: [
		tsconfigPaths(),
		reactRouter(),
	],
	resolve: {
		alias: {
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
		},
	},
})
