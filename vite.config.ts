import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
	host: true,
	plugins: [
		liveReload(["./templates/**/*"]),
		legacy({
			targets: ["defaults"],
			additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
		}),
		critical({
			criticalUrl: "http://localhost",
			criticalBase: "./web/dist/criticalcss/",
			criticalPages: [{ uri: "/", template: "index" }],
			criticalConfig: {},
		}),
		viteCompression(),
	],
});