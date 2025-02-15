import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$db: './src/server/database',
			$schema: './src/server/schema',
			$jwt: './src/server/jwt',
			$zod: './src/server/zod',
			$interface: './src/interface',
			$types: './src/types',
			$ui: './src/lib/components/ui',
			$custom_ui: './src/lib/components/custom_ui',
			$helpers: './src/lib/helpers',
		}
	}
};

export default config;
