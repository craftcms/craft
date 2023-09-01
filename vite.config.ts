import { defineConfig, loadEnv } from "vite";
import legacy from "@vitejs/plugin-legacy";
import liveReload from "vite-plugin-live-reload";
import critical from "rollup-plugin-critical";
import viteCompression from "vite-plugin-compression";
import WindiCSS from 'vite-plugin-windicss';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd(), '');

	// no sanity checks here. when PRIMARY_SITE_URL is missing, something is wrong.
	const primarySiteUrl = env.PRIMARY_SITE_URL.charAt(env.PRIMARY_SITE_URL.length - 1) === "/" ? env.PRIMARY_SITE_URL.slice(0, env.PRIMARY_SITE_URL.length - 1) : env.PRIMARY_SITE_URL;


	return {
		base: command === "serve" ? "" : "/dist/",
		build: {
			emptyOutDir: true,
			manifest: true,
			outDir: "./web/dist/",
			rollupOptions: {
				input: {
					app: "./src/ts/app.ts",
				},
			},
		},
		server: {
			origin: `${primarySiteUrl}:3000`,
			host: "0.0.0.0",
			port: 3000,
		},
		plugins: [
			WindiCSS(),
			liveReload(["./templates/**/*"]),
			legacy({
				targets: ["defaults", "ie >= 11"],
				additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
			}),
			critical({
				criticalUrl: primarySiteUrl,
				criticalBase: "./web/dist/criticalcss/",
				// add any pages that should be pre-rendered here
				criticalPages: [{ uri: "/", template: "index" }],
				criticalConfig: {
					extract: true,
				},
			}),
			viteCompression(),
		],
		resolve: {
            alias: {
              '@': path.resolve(__dirname, './src')
            },
            preserveSymlinks: true,
        },
	}
  })